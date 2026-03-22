import { UserRoleType } from '../../../prisma/prisma-client/client';

export { UserRoleType };

export interface RoleProps {
  id?: string;
  name: UserRoleType;
}

export class Role {
  public readonly id?: string;
  public readonly name: UserRoleType;

  constructor(props: RoleProps) {
    this.id = props.id;
    this.name = props.name;
  }

  static fromPrisma(data: RoleProps): Role {
    return new Role({
      id: data.id,
      name: data.name,
    });
  }
}
