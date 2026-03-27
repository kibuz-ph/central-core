import { faker } from '@faker-js/faker';
import 'dotenv/config';
import { Prisma, PrismaClient } from '../prisma/prisma-client/client';
import { seedApartments } from './seeders/apartments.seeder';
import { seedCommonAreas } from './seeders/common-area.seeder';
import { seedResidentialComplexes } from './seeders/residential-complex.seeder';
import { seedTowers } from './seeders/towers.seeder';

const prisma = new PrismaClient();

async function validateSeedsHaveRun() {
  const adminEmail = process.env.KIBUZ_ADMIN_EMAIL;
  if (!adminEmail) throw new Error('KIBUZ_ADMIN_EMAIL environment variable is not set');

  const kibuzUser = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!kibuzUser) {
    throw new Error(
      'Seeds have not been run. Execute "npm run prisma:seed" before running mock data.',
    );
  }

  const masterRole = await prisma.role.findFirst({ where: { name: 'MASTER' } });
  if (!masterRole) {
    throw new Error(
      'Seeds have not been run. Execute "npm run prisma:seed" before running mock data.',
    );
  }
}

async function createUsers(tx: Prisma.TransactionClient) {
  const password = '$2b$10$PjReZjiztFbzgz3HlVL/MuSpMwm8o265DxJ6Jb84RB6S0BDIxFmRW';

  const usersArray = Array.from({ length: 5 }).map(() => ({
    id: faker.string.uuid(),
    username: faker.internet.username().toLowerCase(),
    email: faker.internet.email().toLowerCase(),
    password,
    isActive: true,
  }));

  const users = await Promise.all(
    usersArray.map(userData =>
      tx.user.create({
        data: userData,
      }),
    ),
  );

  console.log(`✅ Created ${users.length} users`);

  const usersDetailsData = Array.from({ length: 5 }).map((_: unknown, index: number) => ({
    document: faker.string.numeric(10),
    firstName: faker.person.firstName(),
    secondName: faker.datatype.boolean() ? faker.person.firstName() : undefined,
    lastName: faker.person.lastName(),
    secondLastName: faker.datatype.boolean() ? faker.person.lastName() : undefined,
    birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
    phone: faker.phone.number(),
    userId: usersArray[index].id,
  }));

  const usersDetails = await Promise.all(
    usersDetailsData.map(userDetailsData =>
      tx.userDetail.create({
        data: userDetailsData,
      }),
    ),
  );

  console.log(`✅ Created ${usersDetails.length} user details`);
  return users;
}

async function main() {
  await validateSeedsHaveRun();
  await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      await createUsers(tx);
      await seedResidentialComplexes(tx);
      await seedCommonAreas(tx);
      await seedTowers(tx);
      await seedApartments(tx);
    },
    { timeout: 100000 },
  );
  console.info('✅ Mock data created successfully');
}

main()
  .catch(e => {
    console.error('❌ Error creating mock data:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
