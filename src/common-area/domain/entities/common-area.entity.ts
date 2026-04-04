export interface CommonAreaProps {
  id?: string;
  name: string;
  icon?: string | null;
  description?: string | null;
  residentialComplexId: string;
}

export class CommonArea {
  public readonly id?: string;
  public readonly name: string;
  public readonly icon?: string;
  public readonly description?: string;
  public readonly residentialComplexId: string;

  constructor(props: CommonAreaProps) {
    this.id = props.id;
    this.name = props.name;
    this.icon = props.icon ?? undefined;
    this.description = props.description ?? undefined;
    this.residentialComplexId = props.residentialComplexId;
  }

  static fromPrisma(data: CommonAreaProps): CommonArea {
    return new CommonArea(data);
  }
}
