import { faker } from '@faker-js/faker';
import { Prisma } from '../../prisma/prisma-client/client';

export async function seedResidentialComplexes(tx: Prisma.TransactionClient) {
  const complexesData = Array.from({ length: 10 }).map(() => {
    const companyName = faker.company.name();
    return {
      nit: faker.number.int({ min: 900000000, max: 999999999 }),
      name: `${companyName} Residencial`,
      slug: faker.helpers.slugify(`${companyName} residencial`).toLowerCase(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.helpers.arrayElement(['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena']),
      state: faker.helpers.arrayElement([
        'Cundinamarca',
        'Antioquia',
        'Valle del Cauca',
        'Atlántico',
        'Bolívar',
      ]),
      country: 'Colombia',
      logo: faker.datatype.boolean() ? faker.image.url() : undefined,
      primaryColor: faker.color.rgb(),
      secondaryColor: faker.color.rgb(),
      isActive: faker.datatype.boolean({ probability: 0.9 }),
    };
  });

  const complexes = await Promise.all(
    complexesData.map(data =>
      tx.residentialComplex.upsert({
        where: { slug: data.slug },
        update: {},
        create: data,
      }),
    ),
  );

  console.log(`✅ Created/updated ${complexes.length} residential complexes`);
  return complexes;
}
