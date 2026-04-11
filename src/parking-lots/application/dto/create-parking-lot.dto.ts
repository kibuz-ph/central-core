import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ParkingLotType } from '../../../prisma/prisma-client/client';

export class CreateParkingLotDto {
  @ApiProperty({
    example: 'P-101',
    description: 'Parking lot reference',
  })
  @IsString()
  @IsNotEmpty()
  reference: string;

  @ApiPropertyOptional({
    example: 'Near the entrance',
    description: 'Parking lot description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    enum: ParkingLotType,
    example: ParkingLotType.SINGLE,
    description: 'Parking lot type',
  })
  @IsEnum(ParkingLotType)
  @IsNotEmpty()
  type: ParkingLotType;

  @ApiPropertyOptional({
    example: '0f48881f-6e53-4170-93bd-c575e2e33c38',
    description: 'Apartment ID (optional)',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  apartmentId?: string;
}
