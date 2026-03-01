export interface CommonAreaProps {
  id?: string;
  name: string;
  icon?: string;
  description?: string;
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
    this.icon = props.icon;
    this.description = props.description;
    this.residentialComplexId = props.residentialComplexId;
  }

  static fromPrisma(data: CommonAreaProps) {
    return new CommonArea({
      id: data.id,
      name: data.name,
      icon: data.icon,
      description: data.description,
      residentialComplexId: data.residentialComplexId,
    });
  }
}
