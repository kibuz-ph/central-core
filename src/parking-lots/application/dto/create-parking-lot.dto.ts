import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ParkingLotType } from '../../domain/entities/parking-lot.entity';

export class CreateParkingLotDto {
  @ApiProperty({
    example: 'P-101',
    description: 'Parking lot reference',
  })
  @IsString()
  @IsNotEmpty()
  reference: string;

  @ApiProperty({
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
}
