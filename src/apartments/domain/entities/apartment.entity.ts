export interface ApartmentProps {
  id?: string;
  floor: number;
  reference: string;
  size: string;
  towerId?: string;
  residentialComplexId: string;
}

export class Apartment {
  public readonly id?: string;
  public readonly floor: number;
  public readonly reference: string;
  public readonly size: string;
  public readonly towerId?: string;
  public readonly residentialComplexId: string;

  constructor(props: ApartmentProps) {
    this.id = props.id;
    this.floor = props.floor;
    this.reference = props.reference;
    this.size = props.size;
    this.towerId = props.towerId;
    this.residentialComplexId = props.residentialComplexId;
  }

  static fromPrisma(data: ApartmentProps): Apartment {
    return new Apartment({
      id: data.id,
      floor: data.floor,
      reference: data.reference,
      size: data.size,
      towerId: data.towerId,
      residentialComplexId: data.residentialComplexId,
    });
  }
}
