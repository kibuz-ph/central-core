import { Prisma } from '../../../prisma/prisma-client/client';
import { UserDetail } from '../entities/user-detail.entity';

export interface UserDetailRepositoryInterface {
  findUnique({ conditions }: { conditions: any }): Promise<UserDetail | null>;
  create(userDetail: UserDetail, tx?: Prisma.TransactionClient): Promise<UserDetail>;
  update(
    id: string,
    userDetail: Partial<UserDetail>,
    tx?: Prisma.TransactionClient,
  ): Promise<UserDetail>;
}
