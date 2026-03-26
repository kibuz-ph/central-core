import { faker } from '@faker-js/faker';
import { generateSlug } from '../../common/utils/slug-generator.util';
import { Prisma, UserRoleType } from '../../prisma/prisma-client/client';

export async function seedResidentialComplexes(tx: Prisma.TransactionClient) {
  const complexesData = Array.from({ length: 10 }).map(() => {
    const companyName = faker.company.name();
    return {
      nit: faker.number.int({ min: 900000000, max: 999999999 }),
      name: `${companyName} Residencial`,
      slug: generateSlug(`${companyName} Residencial`),
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

  const adminEmail = process.env.KIBUZ_ADMIN_EMAIL;
  if (!adminEmail) throw new Error('KIBUZ_ADMIN_EMAIL environment variable is not set');

  const kibuzUser = await tx.user.findUnique({ where: { email: adminEmail } });
  if (!kibuzUser) throw new Error('KIBUZ admin user not found. Run seeds first.');

  const masterRole = await tx.role.findUnique({ where: { name: UserRoleType.MASTER } });
  if (!masterRole) throw new Error('MASTER role not found. Run seeds first.');

  await Promise.all(
    complexes.map(complex =>
      tx.userRole.upsert({
        where: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          userId_roleId_residentialComplexId: {
            userId: kibuzUser.id,
            roleId: masterRole.id,
            residentialComplexId: complex.id,
          },
        },
        update: {},
        create: {
          userId: kibuzUser.id,
          roleId: masterRole.id,
          residentialComplexId: complex.id,
        },
      }),
    ),
  );

  console.log(
    `✅ Assigned MASTER role to KIBUZ user for ${complexes.length} residential complexes`,
  );

  return complexes;
}
