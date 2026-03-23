import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '../prisma-client/client';
import { userTypes } from '../../users/domain/enums/user-types.enum';
import { SeederInterface } from './index';

export class AdminUserSeeder20260321002000 implements SeederInterface {
  async run(prisma: PrismaClient): Promise<void> {
    console.log('** Executing AdminUserSeeder20260321002000 **');

    const email = process.env.KIBUZ_ADMIN_EMAIL;
    if (!email) throw new Error('KIBUZ_ADMIN_EMAIL environment variable is not set');

    const plainPassword = process.env.KIBUZ_ADMIN_PASSWORD;
    if (!plainPassword) throw new Error('KIBUZ_ADMIN_PASSWORD environment variable is not set');
    const password = await bcrypt.hash(plainPassword, 10);

    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        username: 'admin.kibuz',
        email,
        password,
        type: userTypes.KIBUZ,
        isActive: true,
      },
    });

    console.log('✅ AdminUserSeeder completed.');
  }
}
