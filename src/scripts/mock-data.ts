import { faker } from '@faker-js/faker';
import 'dotenv/config';
import { Prisma, PrismaClient } from '../prisma/prisma-client/client';
import { Role } from '../prisma/prisma-client/enums';

const prisma = new PrismaClient();

async function createUsers(tx: Prisma.TransactionClient) {
  const password = '$2b$10$PjReZjiztFbzgz3HlVL/MuSpMwm8o265DxJ6Jb84RB6S0BDIxFmRW'; // Kibuz2025*

  const usersData = [
    {
      username: 'admin.kibuz',
      role: Role.ADMIN,
      document: faker.string.numeric(10),
      firstName: 'Admin',
      lastName: 'Kibuz',
      birthday: faker.date.birthdate({ min: 25, max: 50, mode: 'age' }),
      email: 'admin@kibuz.com',
      phone: faker.phone.number(),
      password,
      isActive: true,
    },
    ...Array.from({ length: 5 }).map(() => ({
      username: faker.internet.username().toLowerCase(),
      role: Role.USER,
      document: faker.string.numeric(10),
      firstName: faker.person.firstName(),
      secondName: faker.datatype.boolean() ? faker.person.firstName() : undefined,
      lastName: faker.person.lastName(),
      secondLastName: faker.datatype.boolean() ? faker.person.lastName() : undefined,
      birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
      email: faker.internet.email().toLowerCase(),
      phone: faker.phone.number(),
      password,
      isActive: true,
    })),
  ];

  const users = await Promise.all(
    usersData.map(userData =>
      tx.user.create({
        data: userData,
      }),
    ),
  );

  console.log(`✅ Created ${users.length} users (1 admin, 5 regular users)`);
  return users;
}

async function main() {
  await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      await createUsers(tx);
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
