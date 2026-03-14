export interface UserRoleProps {
  id?: string;
  userId: string;
  roleId: string;
  residentialComplexId: string;
}

export class UserRole {
  public readonly id?: string;
  public readonly userId: string;
  public readonly roleId: string;
  public readonly residentialComplexId: string;

  constructor(props: UserRoleProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.roleId = props.roleId;
    this.residentialComplexId = props.residentialComplexId;
  }

  static fromPrisma(data: UserRoleProps): UserRole {
    return new UserRole({
      id: data.id,
      userId: data.userId,
      roleId: data.roleId,
      residentialComplexId: data.residentialComplexId,
    });
  }
}
