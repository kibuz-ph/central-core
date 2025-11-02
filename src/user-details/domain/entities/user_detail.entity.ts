export interface UserDetailProps {
  id?: string;
  document: string;
  firstName: string;
  secondName?: string;
  lastName: string;
  secondLastName?: string;
  birthday: Date;
  email: string;
  phone: string;
  userId: string;
}

export class UserDetail {
  public readonly id?: string;
  public readonly document: string;
  public readonly firstName: string;
  public readonly secondName?: string;
  public readonly lastName: string;
  public readonly secondLastName?: string;
  public readonly birthday: Date;
  public readonly email: string;
  public readonly phone: string;
  public readonly userId: string;

  constructor(props: UserDetailProps) {
    this.id = props.id;
    this.document = props.document;
    this.firstName = props.firstName;
    this.secondName = props.secondName;
    this.lastName = props.lastName;
    this.secondLastName = props.secondLastName;
    this.birthday = props.birthday;
    this.email = props.email;
    this.phone = props.phone;
    this.userId = props.userId;
  }

  static fromPrisma(data: UserDetailProps): UserDetail {
    return new UserDetail({
      id: data.id,
      document: data.document,
      firstName: data.firstName,
      secondName: data.secondName,
      lastName: data.lastName,
      secondLastName: data.secondLastName,
      birthday: data.birthday,
      email: data.email,
      phone: data.phone,
      userId: data.userId,
    });
  }
}
