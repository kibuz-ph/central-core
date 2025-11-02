import { PaginationQueryDto } from '../../../common/dtos/pagination-query.dto';
import { UserResponseDto } from '../../application/dto/user-response.dto';
import { User } from '../entities/user.entity';

export interface UserRepositoryInterface {
  findByIdAuth(id: string): Promise<User | null>;
  findByEmailAuth(email: string): Promise<User | null>;
  findAll(paginationQueryDto: PaginationQueryDto): Promise<UserResponseDto[] | null>;
  findUnique({
    conditions,
    include,
  }: {
    conditions: any;
    include?: any;
  }): Promise<UserResponseDto | null>;
  create(user: User): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<boolean>;
}
