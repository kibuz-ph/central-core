import { User } from '../entities/user.entity';

export interface UserRepositoryInterface {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
