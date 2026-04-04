import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '../../../../prisma/prisma-client/client';
import { PrismaService } from '../../../../prisma/prisma.service';
import { PinoLoggerService } from '../../../pino/application/services/pino-logger.service';
import { DomainException } from '../../../pino/domain/exceptions/domain.exception';

@Injectable()
export class TransactionManager {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly pinoLogger: PinoLoggerService,
  ) {}

  async run<T>(operation: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
    try {
      return await this.prismaService.$transaction(operation);
    } catch (error) {
      this.pinoLogger.error('Transaction failed, rolling back: ', error);
      if (error instanceof DomainException || error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Transaction manager operation failed');
    }
  }
}
