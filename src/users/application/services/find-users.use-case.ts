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

  async executeAll(paginationQueryDto: PaginationQueryDto): Promise<UserResponseDto[]> {
    const users = await this.userRepositoryInterface.findAll(paginationQueryDto);

    if (!users) {
      throw new DomainException(`Users not found`);
    }
    return users;
  }

  async executeById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepositoryInterface.findUnique({
      conditions: { id },
    });

    if (!user) {
      throw new DomainException(`User ${id} not found`);
    }

    return user;
  }
}
