import { PrismaClient, UserApartmentType } from '../prisma-client/client';
import { SeederInterface } from './index';

const CATEGORY_USERS = [
  { name: UserApartmentType.OWNER },
  { name: UserApartmentType.TENANT },
  { name: UserApartmentType.RESIDENT },
];

export class CategoryUsersSeeder20260411000000 implements SeederInterface {
  async run(prisma: PrismaClient): Promise<void> {
    console.log('** Executing CategoryUsersSeeder20260411000000 **');

    await prisma.$transaction(
      CATEGORY_USERS.map(categoryUser =>
        prisma.categoryUser.upsert({
          where: { name: categoryUser.name },
          update: {},
          create: categoryUser,
        }),
      ),
    );

    console.log('✅ CategoryUsersSeeder completed.');
  }
}
