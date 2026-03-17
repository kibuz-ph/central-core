import { Prisma } from '../../prisma/prisma-client/client';

export async function seedApartments(tx: Prisma.TransactionClient) {
  const towers = await tx.tower.findMany({
    select: { id: true, name: true, residentialComplexId: true },
  });

  if (towers.length === 0) {
    console.log('⚠️  No towers found. Skipping apartments seeding.');
    return [];
  }

  const apartmentsData = [];

  // Create 1 random apartment for each tower
  for (const tower of towers) {
    const floor = Math.floor(Math.random() * 10) + 1;
    apartmentsData.push({
        floor: floor,
        reference: `${floor}0${Math.floor(Math.random() * 6) + 1}`,
        size: '68 mt2',
        towerId: tower.id,
        residentialComplexId: tower.residentialComplexId,
    });
  }

  const apartments = await Promise.all(apartmentsData.map(data => tx.apartment.create({ data })));

  console.log(`✅ Created/updated ${apartments.length} apartments`);
  return apartments;
}
