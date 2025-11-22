import { UserDetail } from '../entities/user-detail.entity';

export interface UserDetailRepositoryInterface {
  findUnique({ conditions }: { conditions: any }): Promise<UserDetail | null>;
  create(userDetail: UserDetail): Promise<UserDetail>;
  update(id: string, userDetail: Partial<UserDetail>): Promise<UserDetail>;
}
