import { faker } from '@faker-js/faker';
import 'dotenv/config';
import { Prisma, PrismaClient } from '../prisma/prisma-client/client';
import { seedResidentialComplexes } from './seeders/residential-complex.seeder';

const prisma = new PrismaClient();

async function createUsers(tx: Prisma.TransactionClient) {
  const password = '$2b$10$PjReZjiztFbzgz3HlVL/MuSpMwm8o265DxJ6Jb84RB6S0BDIxFmRW'; // Kibuz2025*
  const uuid = faker.string.uuid();

  const usersArray = Array.from({ length: 5 }).map(() => ({
    id: faker.string.uuid(),
    username: faker.internet.username().toLowerCase(),
    email: faker.internet.email().toLowerCase(),
    password,
    isActive: true,
  }));

  const usersData = [
    {
      id: uuid,
      username: 'admin.kibuz',
      email: 'admin@kibuz.com',
      password,
      isActive: true,
    },
    ...usersArray,
  ];

  const users = await Promise.all(
    usersData.map(userData =>
      tx.user.create({
        data: userData,
      }),
    ),
  );

  console.log(`✅ Created ${users.length} users (1 admin, 5 regular users)`);

  const usersDetailsData = [
    {
      document: faker.string.numeric(10),
      firstName: 'Admin',
      lastName: 'Kibuz',
      birthday: faker.date.birthdate({ min: 25, max: 50, mode: 'age' }),
      email: 'admin@kibuz.com',
      phone: faker.phone.number(),
      userId: uuid,
    },
    ...Array.from({ length: 5 }).map((value: any, index: number) => ({
      document: faker.string.numeric(10),
      firstName: faker.person.firstName(),
      secondName: faker.datatype.boolean() ? faker.person.firstName() : undefined,
      lastName: faker.person.lastName(),
      secondLastName: faker.datatype.boolean() ? faker.person.lastName() : undefined,
      birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
      email: usersArray[index].email,
      phone: faker.phone.number(),
      userId: usersArray[index].id,
    })),
  ];

  const usersDetails = await Promise.all(
    usersDetailsData.map(userDetailsData =>
      tx.userDetail.create({
        data: userDetailsData,
      }),
    ),
  );

  console.log(`✅ Created ${usersDetails.length} users details (1 admin, 5 regular users)`);
  return users;
}

async function main() {
  await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      await createUsers(tx);
      await seedResidentialComplexes(tx);
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
