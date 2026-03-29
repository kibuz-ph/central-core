import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { TransactionManager } from './infrastructure/persistence/transaction-manager.prisma';

@Module({
  imports: [PrismaModule],
  providers: [TransactionManager],
  exports: [TransactionManager],
})
export class TransactionManagerModule {}
