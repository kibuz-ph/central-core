import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { UsefulRoomRepositoryInterface } from '../../domain/repositories/useful-room.repository-interface';
import { UpdateUsefulRoomDto } from '../dto/update-useful-room.dto';

@Injectable()
export class UpdateUsefulRoomUseCase {
  constructor(
    @Inject('UsefulRoomRepositoryInterface')
    private readonly usefulRoomRepository: UsefulRoomRepositoryInterface,
  ) {}

  async execute(
    id: string,
    apartmentId: string,
    updateUsefulRoom: UpdateUsefulRoomDto,
  ): Promise<boolean> {
    const usefulRoom = await this.usefulRoomRepository.findUnique({
      conditions: { id, apartmentId },
    });

    if (!usefulRoom) {
      throw new DomainException(`Useful room: ${id} doesn't belong to Apartment: ${apartmentId}`);
    }

    await this.usefulRoomRepository.update(id, updateUsefulRoom);

    return true;
  }
}
