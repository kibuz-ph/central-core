import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateResidentialComplexDto {
  @ApiProperty({
    example: '888222750',
    description: "Residentail complex's NIT",
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  nit?: number;

  @ApiProperty({
    example: 'Kibuz Residential Complex',
    description: "Residentail complex's name",
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: '3146418899',
    description: "Residentail complex's phone",
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: 'Av Siempre Viva 1234',
    description: "Residentail complex's address",
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address?: string;

  @ApiProperty({
    example: 'Medayork',
    description: "Residentail complex's city",
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city?: string;

  @ApiProperty({
    example: 'Antioquia',
    description: "Residentail complex's city",
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  state?: string;

  @ApiProperty({
    example: 'Colombia',
    description: "Residentail complex's country",
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  country?: string;

  @ApiProperty({
    example: 'www.some-url.com',
    description: "Residentail complex's logo",
  })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiProperty({
    example: '#fff',
    description: "Residentail complex's primary color",
  })
  @IsHexColor()
  @IsOptional()
  primaryColor?: string;

  @ApiProperty({
    example: '#000',
    description: "Residentail complex's secondary color",
  })
  @IsHexColor()
  @IsOptional()
  secondaryColor?: string;
}
