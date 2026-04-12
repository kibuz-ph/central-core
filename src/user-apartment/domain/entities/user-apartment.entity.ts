import { Apartment, ApartmentProps } from '../../../apartments/domain/entities/apartment.entity';
import { UserApartmentTypes } from '../../../category-user/domain/enums/user-apartment-type.enum';
import { User, UserProps } from '../../../users/domain/entities/user.entity';

export interface UserApartmentProps {
  id?: string;
  userId: string;
  categoryUserId: string;
  apartmentId: string;
  categoryUserName?: UserApartmentTypes;
  user?: UserProps;
  apartment?: ApartmentProps;
}

export class UserApartment {
  public readonly id?: string;
  public readonly userId: string;
  public readonly categoryUserId: string;
  public readonly apartmentId: string;
  public readonly categoryUserName?: UserApartmentTypes;
  public readonly user?: User;
  public readonly apartment?: Apartment;

  constructor(props: UserApartmentProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.categoryUserId = props.categoryUserId;
    this.apartmentId = props.apartmentId;
    this.categoryUserName = props.categoryUserName;
    this.user = props.user ? User.fromPrisma(props.user) : undefined;
    this.apartment = props.apartment ? Apartment.fromPrisma(props.apartment) : undefined;
  }

  static fromPrisma(data: UserApartmentProps): UserApartment {
    return new UserApartment(data);
  }
}
