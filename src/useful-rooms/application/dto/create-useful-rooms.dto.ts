import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateUsefulRoomDto } from './create-useful-room.dto';

export class CreateUsefulRoomsDto {
  @ApiProperty({
    description: "Apartment's useful rooms",
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateUsefulRoomDto)
  items: CreateUsefulRoomDto[];
}
