import { Inject, Injectable } from '@nestjs/common';
import { UsefulRoomRepositoryInterface } from '../../domain/repositories/useful-room.repository-interface';
import { UsefulRoomResponseDto } from '../dto/useful-room-response.dto';

@Injectable()
export class FindUsefulRoomsByApartmentUseCase {
  constructor(
    @Inject('UsefulRoomRepositoryInterface')
    private readonly usefulRoomRepository: UsefulRoomRepositoryInterface,
  ) {}

  async execute(apartmentId: string): Promise<UsefulRoomResponseDto[]> {
    const usefulRooms = await this.usefulRoomRepository.findMany({
      conditions: { apartmentId, deletedAt: null },
    });

    return usefulRooms.map(usefulRoom => UsefulRoomResponseDto.fromEntities(usefulRoom));
  }
}
