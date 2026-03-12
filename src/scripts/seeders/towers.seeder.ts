import { Prisma } from '../../prisma/prisma-client/client';

export async function seedTowers(tx: Prisma.TransactionClient) {
  const residentialComplexes = await tx.residentialComplex.findMany({
      select: { id: true, name: true },
    });
  
    if (residentialComplexes.length === 0) {
      console.log('⚠️  No residential complexes found. Skipping common areas seeding.');
      return [];
    }
  
    const towersData = [];
  
    // Create 3 random towers for each residential complex
    for (const complex of residentialComplexes) {

      let cont = 1;
      for (let index = 0; index < 3; index++) {
        towersData.push({
          name: `Torre ${cont}`,
          description: '',
          residentialComplexId: complex.id,
        });

        cont += 1;
      }
    }
  
    const towers = await Promise.all(
      towersData.map(data => tx.tower.create({ data })),
    );

  console.log(`✅ Created/updated ${towers.length} towers`);
  return towers;
}
