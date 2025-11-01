import { Inject } from '@nestjs/common';
import { PaginationQueryDto } from '../../../common/dtos/pagination-query.dto';
import { Prisma } from '../../../prisma/prisma-client/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserResponseDto, UserResponseProps } from '../../application/dto/user-response.dto';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository-interface';

export class UserPrismaRepository implements UserRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findByIdAuth(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user
      ? new User({
          ...user,
        })
      : null;
  }

  async findByEmailAuth(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user
      ? new User({
          ...user,
        })
      : null;
  }

  async findAll(paginationQueryDto: PaginationQueryDto): Promise<UserResponseDto[] | null> {
    const users = await this.prisma.user.findMany({
      include: {
        userDetail: true,
      },
      where: {
        isActive: true,
      },
      take: paginationQueryDto.perPage,
      skip: paginationQueryDto.page,
    });

    if (!users) return null;

    return UserResponseDto.fromEntitiesAll(users as UserResponseProps[]);
  }

  async findUnique({
    conditions,
  }: {
    conditions: Prisma.UserWhereInput;
  }): Promise<UserResponseDto | null> {
    const user = await this.prisma.user.findFirst({
      include: {
        userDetail: true,
      },
      where: conditions,
    });

    if (!user) return null;

    return UserResponseDto.fromEntities(user as UserResponseProps);
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        ...user,
        password: user.getPassword(),
      },
    });

    return User.fromPrisma(createdUser);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { ...user },
    });

    return User.fromPrisma(updatedUser);
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
    return true;
  }
}
