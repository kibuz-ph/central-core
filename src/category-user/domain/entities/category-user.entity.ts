import { UserApartmentTypes } from '../enums/user-apartment-type.enum';

export interface CategoryUserProps {
  id?: string;
  name: UserApartmentTypes;
}

export class CategoryUser {
  public readonly id?: string;
  public readonly name: UserApartmentTypes;

  constructor(props: CategoryUserProps) {
    this.id = props.id;
    this.name = props.name;
  }

  static fromPrisma(data: CategoryUserProps): CategoryUser {
    return new CategoryUser({
      id: data.id,
      name: data.name,
    });
  }
}
