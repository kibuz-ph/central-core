import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository-interface';

@Injectable()
export class UserPrismaRepository implements UserRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        ...user,
        password: user.getPassword(),
      },
    });
    return new User({
      ...createdUser,
      secondName: createdUser.secondName ?? undefined,
      secondLastName: createdUser.secondLastName ?? undefined,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user
      ? new User({
          ...user,
          secondName: user.secondName ?? '',
          secondLastName: user.secondLastName ?? '',
        })
      : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user
      ? new User({
          ...user,
          secondName: user.secondName ?? '',
          secondLastName: user.secondLastName ?? '',
        })
      : null;
  }
}
