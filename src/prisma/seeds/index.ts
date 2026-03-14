import 'dotenv/config';
import { PrismaClient } from '../prisma-client/client';
import { RolesSeeder20260314000000 } from './20260314000000-roles.seed';

export interface SeederInterface {
  run(prisma: PrismaClient): Promise<void>;
}

const seeders: SeederInterface[] = [new RolesSeeder20260314000000()];

const prisma = new PrismaClient();

async function main() {
  for (const seeder of seeders) {
    await seeder.run(prisma);
  }
  console.info('✅ All seeds executed successfully');
}

main()
  .catch(e => {
    console.error('❌ Error running seeds:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
