import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTowerDto {
  @ApiProperty({
    example: 'Tower 1',
    description: "Tower name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Some tower description',
    description: 'Some description to tower',
  })
  @IsString()
  @IsOptional()
  description?: string;
}