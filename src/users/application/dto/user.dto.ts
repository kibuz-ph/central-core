import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { User } from '../../domain/entities/user.entity';

export class UserDto {
  @ApiProperty({ example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f', description: "User's unique ID" })
  @IsString()
  id?: string;

  @ApiProperty({ example: 'john.reynold', description: 'Username of the user' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'jhon.doe@example.com', description: 'Email of the user' })
  @IsString()
  email: string;

  @ApiProperty({ example: true, description: 'Is user Active' })
  @IsBoolean()
  isActive: boolean;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.isActive = user.isActive;
  }

  static fromEntities(user: User): UserDto {
    return new UserDto(user);
  }
}
