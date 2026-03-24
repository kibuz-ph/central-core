import { UserRoleTypes } from '../../../role/domain/enums/user-role-types.enum';

export interface UserRoleProps {
  id?: string;
  userId: string;
  roleId: string;
  residentialComplexId: string;
  roleName?: UserRoleTypes;
}

export class UserRole {
  public readonly id?: string;
  public readonly userId: string;
  public readonly roleId: string;
  public readonly residentialComplexId: string;
  public readonly roleName?: UserRoleTypes;

  constructor(props: UserRoleProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.roleId = props.roleId;
    this.residentialComplexId = props.residentialComplexId;
    this.roleName = props.roleName;
  }

  static fromPrisma(data: UserRoleProps): UserRole {
    return new UserRole({
      id: data.id,
      userId: data.userId,
      roleId: data.roleId,
      residentialComplexId: data.residentialComplexId,
      roleName: data.roleName,
    });
  }
}
