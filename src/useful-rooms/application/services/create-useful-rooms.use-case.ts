import { Inject, Injectable } from '@nestjs/common';
import { ApartmentRepositoryInterface } from '../../../apartments/domain/repositories/apartment.repository-interface';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { UsefulRoomRepositoryInterface } from '../../domain/repositories/useful-room.repository-interface';
import { UsefulRoomResponseDto } from '../dto/useful-room-response.dto';
import { CreateUsefulRoomDto } from '../dto/create-useful-room.dto';

@Injectable()
export class CreateUsefulRoomsUseCase {
  constructor(
    @Inject('UsefulRoomRepositoryInterface')
    private readonly usefulRoomRepository: UsefulRoomRepositoryInterface,
    @Inject('ApartmentRepositoryInterface')
    private readonly apartmentRepository: ApartmentRepositoryInterface,
  ) {}

  async execute(
    apartmentId: string,
    createUsefulRooms: CreateUsefulRoomDto[],
  ): Promise<UsefulRoomResponseDto[]> {
    const apartment = await this.apartmentRepository.findUnique({
      conditions: { id: apartmentId },
    });

    if (!apartment) {
      throw new DomainException(`Apartment: ${apartmentId} not found`);
    }

    const usefulRooms = await this.usefulRoomRepository.createMany(
      createUsefulRooms.map(usefulRoom => ({ ...usefulRoom, apartmentId })),
    );

    return usefulRooms.map(usefulRoom => UsefulRoomResponseDto.fromEntities(usefulRoom));
  }
}
