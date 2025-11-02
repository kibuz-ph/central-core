import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsObject, IsString } from 'class-validator';
import { UserDetail } from '../../../user-details/domain/entities/user_detail.entity';

export interface UserResponseProps {
  id?: string;
  username: string;
  email: string;
  isActive: boolean;
  userDetail?: UserDetail;
}

export class UserResponseDto {
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

  @ApiProperty({ type: UserDetail, description: 'User details' })
  @Type(() => UserDetail)
  @IsObject()
  userDetail?: UserDetail;

  constructor(user: UserResponseProps) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.isActive = user.isActive;

    if (user.userDetail != null) {
      this.userDetail = new UserDetail({
        id: user.userDetail.id,
        document: user.userDetail.document,
        firstName: user.userDetail.firstName,
        secondName: user.userDetail.secondName,
        lastName: user.userDetail.lastName,
        secondLastName: user.userDetail.secondLastName,
        birthday: user.userDetail.birthday,
        email: user.userDetail.email,
        phone: user.userDetail.phone,
        userId: user.userDetail.userId,
      });
    }
  }

  static fromEntities(user: UserResponseProps): UserResponseDto {
    return new UserResponseDto(user);
  }

  static fromEntitiesAll(users: UserResponseProps[]): UserResponseDto[] {
    const usersResp: UserResponseDto[] = [];
    users.map(user => {
      usersResp.push(new UserResponseDto(user));
    });
    return usersResp;
  }
}
