import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { rolesName } from '../../../domain/entities/enums/roles.enum';
import { User } from '../../../domain/entities/user.entity';

export class UserDto {
  @ApiProperty({ example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f', description: "User's unique ID" })
  @IsString()
  id?: string;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Alex', description: 'Second name of the user' })
  @IsString()
  @IsOptional()
  secondName?: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Reynolds', description: 'Second last name of the user' })
  @IsString()
  @IsOptional()
  secondLastName?: string;

  @ApiProperty({ example: 'john.reynold', description: 'Username of the user' })
  @IsString()
  username: string;

  @ApiProperty({ example: rolesName.USER, description: 'Username of the user', enum: rolesName })
  @IsEnum(rolesName)
  role: string;

  @ApiProperty({ example: '1212213213', description: 'Document of the user' })
  @IsString()
  document: string;

  @ApiProperty({ example: '1990-01-01', description: "User's birthday (YYYY-MM-DD)" })
  @IsDateString()
  birthday: Date;

  @ApiProperty({ example: 'jhon.doe@example.com', description: 'Email of the user' })
  @IsString()
  email: string;

  @ApiProperty({ example: '3141341343', description: 'Phone of the user' })
  @IsString()
  phone: string;

  @ApiProperty({ example: true, description: 'Is user Active' })
  @IsBoolean()
  isActive: boolean;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.role = user.role;
    this.document = user.document;
    this.firstName = user.firstName;
    this.secondName = user.secondName;
    this.lastName = user.lastName;
    this.secondLastName = user.secondLastName;
    this.birthday = user.birthday;
    this.email = user.email;
    this.phone = user.phone;
    this.isActive = user.isActive;
  }
}
