import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUsefulRoomDto {
  @ApiPropertyOptional({
    example: 'Laundry Room',
    description: 'Useful room reference',
    required: false,
  })
  @IsString()
  @IsOptional()
  reference?: string;

  @ApiPropertyOptional({
    example: 'Shared laundry room on floor 3',
    description: 'Useful room description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
