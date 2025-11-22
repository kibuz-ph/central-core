import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { UserDetail } from '../../domain/entities/user-detail.entity';

export class UserDetailResponseDto {
  @ApiProperty({ example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f', description: "User's unique ID" })
  @IsString()
  id?: string;

  @ApiProperty({ example: '1212213213', description: 'Document of the user' })
  @IsString()
  document: string;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Alex', description: 'Second name of the user' })
  @IsString()
  secondName?: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Reynolds', description: 'Second last name of the user' })
  @IsString()
  secondLastName?: string;

  @ApiProperty({ example: '1990-01-01', description: "User's birthday (YYYY-MM-DD)" })
  @Type(() => Date)
  birthday: Date;

  @ApiProperty({ example: '3141341343', description: 'Phone of the user' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f', description: "User's unique ID" })
  @IsString()
  userId: string;

  constructor(userDetail: UserDetail) {
    this.id = userDetail.id;
    this.document = userDetail.document;
    this.firstName = userDetail.firstName;
    this.secondName = userDetail.secondName;
    this.lastName = userDetail.lastName;
    this.secondLastName = userDetail.secondLastName;
    this.birthday = userDetail.birthday;
    this.phone = userDetail.phone;
    this.userId = userDetail.userId;
  }

  static fromEntities(userDetail: UserDetail): UserDetailResponseDto {
    return new UserDetailResponseDto(userDetail);
  }
}
