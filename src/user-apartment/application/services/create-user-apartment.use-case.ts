import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '../../../prisma/prisma-client/client';
import { UserApartment } from '../../domain/entities/user-apartment.entity';
import { UserApartmentRepositoryInterface } from '../../domain/repositories/user-apartment.repository-interface';

@Injectable()
export class CreateUserApartmentUseCase {
  constructor(
    @Inject('UserApartmentRepositoryInterface')
    private readonly userApartmentRepository: UserApartmentRepositoryInterface,
  ) {}

  async create(
    userApartment: UserApartment,
    tx?: Prisma.TransactionClient,
  ): Promise<UserApartment> {
    return this.userApartmentRepository.create(userApartment, tx);
  }
}
