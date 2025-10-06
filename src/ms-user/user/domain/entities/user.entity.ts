import * as bcrypt from 'bcryptjs';
import { RoleNamesTypes } from './enums/roles.enum';

export interface UserProps {
  id?: string;
  username: string;
  role: RoleNamesTypes;
  document: string;
  firstName: string;
  secondName?: string;
  lastName: string;
  secondLastName?: string;
  birthday: Date;
  email: string;
  phone: string;
  isActive: boolean;
  password?: string;
}

export class User {
  public readonly id?: string;
  public readonly username: string;
  public readonly role: RoleNamesTypes;
  public readonly document: string;
  public readonly firstName: string;
  public readonly secondName?: string;
  public readonly lastName: string;
  public readonly secondLastName?: string;
  public readonly birthday: Date;
  public readonly email: string;
  public readonly phone: string;
  public readonly isActive: boolean;
  private password: string;

  constructor(props: UserProps) {
    this.id = props.id;
    this.username = props.username;
    this.role = props.role;
    this.document = props.document;
    this.firstName = props.firstName;
    this.secondName = props.secondName;
    this.lastName = props.lastName;
    this.secondLastName = props.secondLastName;
    this.birthday = props.birthday;
    this.email = props.email;
    this.phone = props.phone;
    this.isActive = props.isActive;
    this.password = props.password ?? '';
  }

  async setPassword(newPassword: string) {
    this.password = await bcrypt.hash(newPassword, 10);
  }

  getPassword(): string {
    return this.password;
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
      role: data.role,
      document: data.document,
      firstName: data.firstName,
      secondName: data.secondName,
      lastName: data.lastName,
      secondLastName: data.secondLastName,
      birthday: data.birthday,
      email: data.email,
      phone: data.phone,
      isActive: data.isActive,
      password: data.password,
    });
  }
}
