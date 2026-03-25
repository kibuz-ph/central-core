import { UserRoleTypes } from '../enums/user-role-types.enum';

export interface RoleProps {
  id?: string;
  name: UserRoleTypes;
}

export class Role {
  public readonly id?: string;
  public readonly name: UserRoleTypes;

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
