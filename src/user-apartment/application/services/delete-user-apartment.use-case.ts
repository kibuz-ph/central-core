import { Inject, Injectable } from '@nestjs/common';
import { UserApartmentRepositoryInterface } from '../../domain/repositories/user-apartment.repository-interface';

@Injectable()
export class DeleteUserApartmentUseCase {
  constructor(
    @Inject('UserApartmentRepositoryInterface')
    private readonly userApartmentRepository: UserApartmentRepositoryInterface,
  ) {}

  async delete(id: string): Promise<void> {
    return this.userApartmentRepository.delete(id);
  }
}
