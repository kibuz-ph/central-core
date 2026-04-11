import { ApiProperty } from '@nestjs/swagger';
import { ApartmentResponseDto } from '../../../apartments/application/dto/apartment-response.dto';
import { UsefulRoom } from '../../domain/entities/useful-room.entity';

export class UsefulRoomResponseDto {
  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Useful room's unique ID",
  })
  id: string;

  @ApiProperty({
    example: 'Laundry Room',
    description: 'Useful room reference',
  })
  reference: string;

  @ApiProperty({
    example: 'Shared laundry room on floor 3',
    description: 'Useful room description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Apartment's unique ID",
  })
  apartmentId: string;

  @ApiProperty({ type: ApartmentResponseDto, nullable: true, description: "Assigned apartment" })
  apartment: ApartmentResponseDto | null;

  constructor(usefulRoom: UsefulRoom) {
    this.id = usefulRoom.id || '';
    this.reference = usefulRoom.reference;
    this.description = usefulRoom.description ?? undefined;
    this.apartmentId = usefulRoom.apartmentId;
    this.apartment = usefulRoom.apartment ? ApartmentResponseDto.fromEntities(usefulRoom.apartment) : null;
  }

  static fromEntities(usefulRoom: UsefulRoom): UsefulRoomResponseDto {
    return new UsefulRoomResponseDto(usefulRoom);
  }
}
