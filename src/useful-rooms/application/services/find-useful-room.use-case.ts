import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { UsefulRoomRepositoryInterface } from '../../domain/repositories/useful-room.repository-interface';
import { UsefulRoomResponseDto } from '../dto/useful-room-response.dto';

@Injectable()
export class FindUsefulRoomUseCase {
  constructor(
    @Inject('UsefulRoomRepositoryInterface')
    private readonly usefulRoomRepository: UsefulRoomRepositoryInterface,
  ) {}

  async execute(id: string, apartmentId: string): Promise<UsefulRoomResponseDto> {
    const usefulRoom = await this.usefulRoomRepository.findUnique({
      conditions: { id, apartmentId },
    });

    if (!usefulRoom) {
      throw new DomainException(`Useful room: ${id} doesn't belong to Apartment: ${apartmentId}`);
    }

    return UsefulRoomResponseDto.fromEntities(usefulRoom);
  }
}
