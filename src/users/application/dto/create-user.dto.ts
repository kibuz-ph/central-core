import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: '1212213213', description: 'Document of the user' })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Alex', description: 'Second name of the user' })
  @IsString()
  @IsOptional()
  secondName?: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'Reynolds', description: 'Second last name of the user' })
  @IsString()
  @IsOptional()
  secondLastName?: string;

  @ApiProperty({ example: 'john.reynold', description: 'Username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '1990-01-01', description: "User's birthday (YYYY-MM-DD)" })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  birthday: Date;

  @ApiProperty({ example: 'jhon.doe@example.com', description: 'Email of the user' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '3141341343', description: 'Phone of the user' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'SomeStrongP4ssword!', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
