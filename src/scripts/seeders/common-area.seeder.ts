import { faker } from '@faker-js/faker';
import { Prisma } from '../../prisma/prisma-client/client';

const COMMON_AREA_TYPES = [
  { name: 'Piscina', icon: 'pool', description: 'Piscina temperada con zona de recreación' },
  {
    name: 'Gimnasio',
    icon: 'fitness_center',
    description: 'Gimnasio equipado con máquinas modernas',
  },
  {
    name: 'Salón Social',
    icon: 'celebration',
    description: 'Espacio para eventos y celebraciones',
  },
  { name: 'BBQ', icon: 'outdoor_grill', description: 'Zona de parrillas y asadores' },
  { name: 'Parque Infantil', icon: 'playground', description: 'Área de juegos para niños' },
  { name: 'Cancha de Tenis', icon: 'sports_tennis', description: 'Cancha de tenis profesional' },
  {
    name: 'Cancha de Baloncesto',
    icon: 'sports_basketball',
    description: 'Cancha de baloncesto techada',
  },
  { name: 'Jardín', icon: 'park', description: 'Jardín y áreas verdes' },
  {
    name: 'Parqueadero',
    icon: 'local_parking',
    description: 'Parqueadero cubierto para residentes',
  },
  { name: 'Sala de Reuniones', icon: 'meeting_room', description: 'Sala equipada para reuniones' },
  { name: 'Coworking', icon: 'laptop_mac', description: 'Espacio de trabajo compartido' },
  { name: 'Sauna', icon: 'spa', description: 'Sauna y zona de relajación' },
  { name: 'Cine', icon: 'theaters', description: 'Sala de cine privada' },
  { name: 'Zona de Mascotas', icon: 'pets', description: 'Área especial para mascotas' },
  { name: 'Terraza', icon: 'deck', description: 'Terraza con vista panorámica' },
];

export async function seedCommonAreas(tx: Prisma.TransactionClient) {
  // Get all residential complexes
  const residentialComplexes = await tx.residentialComplex.findMany({
    select: { id: true, name: true },
  });

  if (residentialComplexes.length === 0) {
    console.log('⚠️  No residential complexes found. Skipping common areas seeding.');
    return [];
  }

  const commonAreasData = [];

  // Create 3-7 random common areas for each residential complex
  for (const complex of residentialComplexes) {
    const numberOfAreas = faker.number.int({ min: 3, max: 7 });
    const selectedAreas = faker.helpers.arrayElements(COMMON_AREA_TYPES, numberOfAreas);

    for (const area of selectedAreas) {
      commonAreasData.push({
        name: area.name,
        icon: area.icon,
        description: faker.datatype.boolean({ probability: 0.8 }) ? area.description : undefined,
        residentialComplexId: complex.id,
      });
    }
  }

  const commonAreas = await Promise.all(
    commonAreasData.map(data => tx.commonArea.create({ data })),
  );

  console.log(
    `✅ Created ${commonAreas.length} common areas across ${residentialComplexes.length} residential complexes`,
  );
  return commonAreas;
}
