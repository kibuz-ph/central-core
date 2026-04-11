import { Apartment, ApartmentProps } from '../../../apartments/domain/entities/apartment.entity';
import { ParkingLotTypes } from '../enums/parking-lot-types.enum';

export interface ParkingLotProps {
  id?: string;
  reference: string;
  description?: string | null;
  type: ParkingLotTypes;
  apartmentId?: string | null;
  residentialComplexId: string;
  apartment?: ApartmentProps | null;
}

export class ParkingLot {
  public readonly id?: string;
  public readonly reference: string;
  public readonly description?: string;
  public readonly type: ParkingLotTypes;
  public readonly apartmentId?: string;
  public readonly residentialComplexId: string;
  public readonly apartment?: Apartment;

  constructor(props: ParkingLotProps) {
    this.id = props.id;
    this.reference = props.reference;
    this.description = props.description ?? undefined;
    this.type = props.type;
    this.apartmentId = props.apartmentId ?? undefined;
    this.residentialComplexId = props.residentialComplexId;
    this.apartment = props.apartment ? Apartment.fromPrisma(props.apartment) : undefined;
  }

  static fromPrisma(data: ParkingLotProps): ParkingLot {
    return new ParkingLot(data);
  }
}
