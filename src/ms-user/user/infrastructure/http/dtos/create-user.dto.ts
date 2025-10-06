import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { rolesName } from '../../../domain/entities/enums/roles.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  firstName: string;

  @ApiProperty({ example: 'Alex', description: 'Second name of the user' })
  @IsOptional()
  secondName?: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  lastName: string;

  @ApiProperty({ example: 'Reynolds', description: 'Second last name of the user' })
  @IsOptional()
  secondLastName?: string;

  @ApiProperty({ example: 'john.reynold', description: 'Username of the user' })
  username: string;

  @ApiProperty({ example: rolesName.USER, description: 'Username of the user', enum: rolesName })
  @IsEnum(rolesName)
  role: string;

  @ApiProperty({ example: '1212213213', description: 'Document of the user' })
  document: string;

  @ApiProperty({ example: '1990-01-01', description: "User's birthday (YYYY-MM-DD)" })
  @IsDateString()
  birthday: Date;

  @ApiProperty({ example: 'jhon.doe@example.com', description: 'Email of the user' })
  email: string;

  @ApiProperty({ example: '3141341343', description: 'Phone of the user' })
  phone: string;

  @ApiProperty({ example: 'SomeStrongP4ssword!', description: 'User password' })
  password: string;
}
