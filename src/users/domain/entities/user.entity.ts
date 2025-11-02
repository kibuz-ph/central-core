import * as bcrypt from 'bcryptjs';

export interface UserProps {
  id?: string;
  username: string;
  email: string;
  password?: string;
  isActive: boolean;
}

export class User {
  public readonly id?: string;
  public readonly username: string;
  public readonly email: string;
  private password: string;
  public readonly isActive: boolean;

  constructor(props: UserProps) {
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
    this.password = props.password ?? '';
    this.isActive = props.isActive;
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
    const { password, ...data } = this;
    return data;
  }

  static fromPrisma(data: UserProps): User {
    return new User({
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
      isActive: data.isActive,
    });
  }
}
