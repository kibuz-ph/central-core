import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { UserDetailResponseDto } from '../../../user-details/application/dto/user-detail-response.dto';
import { UserDetail } from '../../../user-details/domain/entities/user-detail.entity';

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

  @ApiProperty({
    type: [UserDetailResponseDto],
    description: 'User details',
  })
  userDetail?: UserDetailResponseDto;

  constructor(user: UserResponseProps) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.isActive = user.isActive;
    this.userDetail = user.userDetail && UserDetailResponseDto.fromEntities(user.userDetail);
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
