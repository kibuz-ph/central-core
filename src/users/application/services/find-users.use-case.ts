import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../../../common/dtos/pagination-query.dto';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository-interface';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class FindUsersUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepositoryInterface: UserRepositoryInterface,
  ) {}

  async executeMany(paginationQueryDto: PaginationQueryDto): Promise<UserResponseDto[]> {
    const users = await this.userRepositoryInterface.findMany({
      conditions: { isActive: true },
      paginationQueryDto,
    });

    if (!users) {
      throw new DomainException(`Users not found`);
    }

    return users.map(user => UserResponseDto.fromEntities(user as UserResponseDto));
  }

  async executeById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepositoryInterface.findUnique({
      conditions: { id },
    });

    if (!user) {
      throw new DomainException(`User ${id} not found`);
    }

    return UserResponseDto.fromEntities(user as UserResponseDto);
  }
}
