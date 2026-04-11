import { Apartment, ApartmentProps } from '../../../apartments/domain/entities/apartment.entity';

export interface UsefulRoomProps {
  id?: string;
  reference: string;
  description?: string | null;
  apartmentId: string;
  apartment?: ApartmentProps;
}

export class UsefulRoom {
  public readonly id?: string;
  public readonly reference: string;
  public readonly description?: string;
  public readonly apartmentId: string;
  public readonly apartment?: Apartment;

  constructor(props: UsefulRoomProps) {
    this.id = props.id;
    this.reference = props.reference;
    this.description = props.description ?? undefined;
    this.apartmentId = props.apartmentId;
    this.apartment = props.apartment ? Apartment.fromPrisma(props.apartment) : undefined;
  }

  static fromPrisma(data: UsefulRoomProps): UsefulRoom {
    return new UsefulRoom(data);
  }
}
