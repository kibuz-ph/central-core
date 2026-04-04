export interface ResidentialComplexProps {
  id?: string;
  nit: number;
  name: string;
  slug: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  logo?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  isActive: boolean;
}

export class ResidentialComplex {
  public readonly id?: string;
  public readonly nit: number;
  public readonly name: string;
  public readonly slug: string;
  public readonly phone: string;
  public readonly address: string;
  public readonly city: string;
  public readonly state: string;
  public readonly country: string;
  public readonly logo?: string;
  public readonly primaryColor?: string;
  public readonly secondaryColor?: string;
  public readonly isActive: boolean;

  constructor(props: ResidentialComplexProps) {
    this.id = props.id;
    this.nit = props.nit;
    this.name = props.name;
    this.slug = props.slug;
    this.phone = props.phone;
    this.address = props.address;
    this.city = props.city;
    this.state = props.state;
    this.country = props.country;
    this.logo = props.logo ?? undefined;
    this.primaryColor = props.primaryColor ?? undefined;
    this.secondaryColor = props.secondaryColor ?? undefined;
    this.isActive = props.isActive;
  }

  static fromPrisma(data: ResidentialComplexProps): ResidentialComplex {
    return new ResidentialComplex(data);
  }
}
