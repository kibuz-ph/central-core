import * as bcrypt from 'bcryptjs';
import { UserDetail } from '../../../user-details/domain/entities/user-detail.entity';
import { UserTypes, userTypes } from '../enums/user-types.enum';

export interface UserProps {
  id?: string;
  username: string;
  email: string;
  password?: string;
  type?: UserTypes;
  isActive: boolean;
  userDetail?: UserDetail;
}

export class User {
  public readonly id?: string;
  public readonly username: string;
  public readonly email: string;
  private password: string;
  public readonly type: UserTypes;
  public readonly isActive: boolean;
  public readonly userDetail?: UserDetail | null;

  constructor(props: UserProps) {
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
    this.password = props.password ?? '';
    this.type = props.type ?? userTypes.OTHER;
    this.isActive = props.isActive;
    this.userDetail = props.userDetail;
  }

  async setPassword(newPassword: string) {
    this.password = await bcrypt.hash(newPassword, 10);
  }

  getPassword(): string {
    return this.password;
  }

  async validatePassword(plainPassword: string): Promise<boolean> {
    return this.password ? bcrypt.compare(plainPassword, this.password) : false;
  }

  // This method looks like it's unused, but it's used for security reason on data convertion
  toJSON(): Omit<UserProps, 'password'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, userDetail, ...data } = this;
    return data;
  }

  static fromPrisma(data: UserProps): User {
    return new User({
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
      type: data.type,
      isActive: data.isActive,
      userDetail: data.userDetail,
    });
  }
}
