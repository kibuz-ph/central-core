import { UserDetail } from '../entities/user-detail.entity';

export interface UserDetailRepositoryInterface {
  create(userDetail: UserDetail): Promise<UserDetail>;
  update(id: string, userDetail: Partial<UserDetail>): Promise<UserDetail>;
}
