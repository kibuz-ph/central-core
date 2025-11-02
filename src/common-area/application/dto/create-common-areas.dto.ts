import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCommonAreaDto } from './create-common-area.dto';

export class CreateCommonAreasDto {
  @ApiProperty({
    example: 'Swimming',
    description: "Residentail complex's common area",
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateCommonAreaDto)
  items: CreateCommonAreaDto[];
}
