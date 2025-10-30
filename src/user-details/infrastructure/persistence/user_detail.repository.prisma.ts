import { Inject } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  UserResponseDto,
  UserResponseProps,
} from '../../../users/application/dto/user-response.dto';
import { User } from '../../../users/domain/entities/user.entity';
import { UpdateUserDetailDto } from '../../application/dtos/update-user-detail.dto';
import { UserDetail } from '../../domain/entities/user_detail.entity';
import { UserDetailRepositoryInterface } from '../../domain/repositories/user_detail.repository-interface';

export class UserDetailPrismaRepository implements UserDetailRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async create(user: User, userDetail: UserDetail): Promise<UserResponseDto> {
    const createdUser = await this.prisma.user.create({
      data: {
        ...user,
        password: user.getPassword(),
      },
    });

    await this.prisma.userDetail.create({
      data: {
        ...userDetail,
        userId: createdUser.id,
      },
    });

    const userCrated = { ...createdUser, userDetail: undefined };

    return UserResponseDto.fromEntities(userCrated as UserResponseProps);
  }

  async update(id: string, userData: UpdateUserDetailDto): Promise<UserResponseDto> {
    const userUpdated = await this.prisma.user.update({
      where: { id },
      data: {
        username: userData.username,
        email: userData.email,
        isActive: userData.isActive,
      },
    });

    delete userData.username;
    delete userData.isActive;
    const userDetailUpdated = await this.prisma.userDetail.update({
      where: { userId: id },
      data: userData,
    });

    const user = { ...userUpdated, userDetail: userDetailUpdated };

    return UserResponseDto.fromEntities(user as UserResponseProps);
  }
}
