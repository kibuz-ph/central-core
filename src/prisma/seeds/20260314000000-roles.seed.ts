import { PrismaClient, UserRoleType } from '../prisma-client/client';
import { SeederInterface } from './index';

const ROLES = [
  { name: UserRoleType.MASTER },
  { name: UserRoleType.ADMIN },
  { name: UserRoleType.USER },
];

export class RolesSeeder20260314000000 implements SeederInterface {
  async run(prisma: PrismaClient): Promise<void> {
    console.log('** Executing RolesSeeder20260314000000 **');

    await prisma.$transaction(
      ROLES.map(role =>
        prisma.role.upsert({
          where: { name: role.name },
          update: {},
          create: role,
        }),
      ),
    );

    console.log('✅ RolesSeeder completed.');
  }
}
