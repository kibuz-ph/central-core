import { ApiProperty } from '@nestjs/swagger';
import { UsefulRoomResponseDto } from '../../../useful-rooms/application/dto/useful-room-response.dto';

export class GetApartmentUsefulRoomsResponseDto {
  @ApiProperty({ type: [UsefulRoomResponseDto], description: "Apartment's useful rooms" })
  items: UsefulRoomResponseDto[];
}
