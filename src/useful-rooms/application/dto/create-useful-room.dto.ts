import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUsefulRoomDto {
  @ApiProperty({
    example: 'Laundry Room',
    description: 'Useful room reference',
  })
  @IsString()
  @IsNotEmpty()
  reference: string;

  @ApiProperty({
    example: 'Shared laundry room on floor 3',
    description: 'Useful room description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
