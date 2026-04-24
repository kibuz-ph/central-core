import { Inject, Injectable } from '@nestjs/common';
import { UserApartmentRepositoryInterface } from '../../domain/repositories/user-apartment.repository-interface';
import { UserApartmentResponseDto } from '../dto/user-apartment-response.dto';

@Injectable()
export class FindUserApartmentsByApartmentUseCase {
  constructor(
    @Inject('UserApartmentRepositoryInterface')
    private readonly userApartmentRepository: UserApartmentRepositoryInterface,
  ) {}

  async execute(apartmentId: string): Promise<UserApartmentResponseDto[]> {
    const userApartments = await this.userApartmentRepository.findMany({
      conditions: { apartmentId },
    });
    return userApartments.map(ua => UserApartmentResponseDto.fromEntity(ua));
  }
}
