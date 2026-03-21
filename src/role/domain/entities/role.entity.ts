import { user_role_types } from '../../../prisma/prisma-client/client';

export { user_role_types };

export interface RoleProps {
  id?: string;
  name: user_role_types;
}

export class Role {
  public readonly id?: string;
  public readonly name: user_role_types;

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
