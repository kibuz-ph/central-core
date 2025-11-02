import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommonAreaDto {
  @ApiProperty({
    example: 'Swimming',
    description: "Residentail complex's common area",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'icon-swimming',
    description: "Common area's icon",
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  icon?: string;

  @ApiProperty({
    example: 'Some swimming description',
    description: 'Some description to common area',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
