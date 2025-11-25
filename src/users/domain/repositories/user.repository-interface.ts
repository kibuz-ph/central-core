import { PaginationQueryDto } from '../../../common/dtos/pagination-query.dto';
import { User } from '../entities/user.entity';

export interface UserRepositoryInterface {
  findMany({
    conditions,
    paginationQueryDto,
  }: {
    conditions: any;
    paginationQueryDto: PaginationQueryDto;
  }): Promise<User[]>;
  findUnique({ conditions, include }: { conditions: any; include?: any }): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<boolean>;
}
