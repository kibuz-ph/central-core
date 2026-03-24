export interface UsefulRoomProps {
  id?: string;
  reference: string;
  description?: string;
  apartmentId: string;
}

export class UsefulRoom {
  public readonly id?: string;
  public readonly reference: string;
  public readonly description?: string;
  public readonly apartmentId: string;

  constructor(props: UsefulRoomProps) {
    this.id = props.id;
    this.reference = props.reference;
    this.description = props.description;
    this.apartmentId = props.apartmentId;
  }

  static fromPrisma(data: UsefulRoomProps): UsefulRoom {
    return new UsefulRoom({
      id: data.id,
      reference: data.reference,
      description: data.description,
      apartmentId: data.apartmentId,
    });
  }
}
