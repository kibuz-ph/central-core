import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    example: '1212121212',
    description: 'Document of the user',
  })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({
    example: 'John',
    description: 'Firts name of the user',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Alex',
    description: 'Second name of the user',
  })
  @IsString()
  @IsOptional()
  secondName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'Castano',
    description: 'Second last name of the user',
  })
  @IsString()
  @IsOptional()
  secondLastName?: string;

  @ApiProperty({
    example: 'john.doe',
    description: 'User of the user',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'john.doe@email.com',
    description: 'Password of the user',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '1990-01-01',
    description: "User's birthday (YYYY-MM-DD)",
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  birthday: Date;

  @ApiProperty({
    example: '31464132123',
    description: 'Phone of the user',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'Password123*',
    description: 'Phone of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
