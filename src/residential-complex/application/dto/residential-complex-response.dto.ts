import { ApiProperty } from '@nestjs/swagger';
import { ResidentialComplex } from '../../domain/entities/residential-complex.entity';

export class ResidentialComplexResponseDto {
  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Residentail complex's unique ID",
  })
  id: string;

  @ApiProperty({
    example: '888.222.750-7',
    description: "Residentail complex's NIT",
  })
  nit: number;

  @ApiProperty({
    example: 'Kibuz Residential Complex',
    description: "Residentail complex's name",
  })
  name: string;

  @ApiProperty({
    example: 'kibuz-residential-complex',
    description: "Residentail complex's slug",
  })
  slug: string;

  @ApiProperty({
    example: '3146418899',
    description: "Residentail complex's phone",
  })
  phone: string;

  @ApiProperty({
    example: 'Av Siempre Viva 1234',
    description: "Residentail complex's address",
  })
  address: string;

  @ApiProperty({
    example: 'Medayork',
    description: "Residentail complex's city",
  })
  city: string;

  @ApiProperty({
    example: 'Antioquia',
    description: "Residentail complex's city",
  })
  state: string;

  @ApiProperty({
    example: 'Colombia',
    description: "Residentail complex's country",
  })
  country: string;

  @ApiProperty({
    example: 'www.some-url.com',
    description: "Residentail complex's logo",
  })
  logo?: string;

  @ApiProperty({
    example: '#fff',
    description: "Residentail complex's primary color",
  })
  primaryColor?: string;

  @ApiProperty({
    example: '#000',
    description: "Residentail complex's secondary color",
  })
  secondaryColor?: string;

  @ApiProperty({
    example: true,
    description: 'Is Residentail complex active',
  })
  isActive?: boolean;

  constructor(residentialComplex: ResidentialComplex) {
    this.id = residentialComplex.id || '';
    this.nit = residentialComplex.nit;
    this.name = residentialComplex.name;
    this.slug = residentialComplex.slug;
    this.phone = residentialComplex.phone;
    this.address = residentialComplex.address;
    this.city = residentialComplex.city;
    this.state = residentialComplex.state;
    this.country = residentialComplex.country;
    this.logo = residentialComplex.logo;
    this.primaryColor = residentialComplex.primaryColor;
    this.secondaryColor = residentialComplex.secondaryColor;
    this.isActive = residentialComplex.isActive;
  }

  static fromEntities(residentialComplex: ResidentialComplex): ResidentialComplexResponseDto {
    return new ResidentialComplexResponseDto(residentialComplex);
  }
}
