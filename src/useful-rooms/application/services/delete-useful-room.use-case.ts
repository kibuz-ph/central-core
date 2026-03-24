import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { UsefulRoomRepositoryInterface } from '../../domain/repositories/useful-room.repository-interface';

@Injectable()
export class DeleteUsefulRoomUseCase {
  constructor(
    @Inject('UsefulRoomRepositoryInterface')
    private readonly usefulRoomRepository: UsefulRoomRepositoryInterface,
  ) {}

  async execute(id: string, apartmentId: string): Promise<boolean> {
    const usefulRoom = await this.usefulRoomRepository.findUnique({
      conditions: { id, apartmentId },
    });

    if (!usefulRoom) {
      throw new DomainException(`Useful room: ${id} doesn't belong to Apartment: ${apartmentId}`);
    }

    return this.usefulRoomRepository.delete(id, apartmentId);
  }
}
