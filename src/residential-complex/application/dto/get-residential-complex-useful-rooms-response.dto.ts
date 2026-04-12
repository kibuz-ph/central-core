import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../../common/dtos/paginates-response.dto';
import { UsefulRoomResponseDto } from '../../../useful-rooms/application/dto/useful-room-response.dto';

export class GetResidentialComplexUsefulRoomsResponseDto extends PaginatedResponseDto<UsefulRoomResponseDto> {
  @ApiProperty({ type: [UsefulRoomResponseDto], description: "Residential complex's useful rooms" })
  declare items: UsefulRoomResponseDto[];
}
