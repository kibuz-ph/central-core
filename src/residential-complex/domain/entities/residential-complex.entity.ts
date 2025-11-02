import { CommonArea } from '../../../common-area/domain/entities/common-area.entity';

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
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  isActive: boolean;
  commonAreas?: CommonArea[];
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
  public readonly commonAreas?: CommonArea[];

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
    this.logo = props.logo;
    this.primaryColor = props.primaryColor;
    this.secondaryColor = props.secondaryColor;
    this.isActive = props.isActive;
    this.commonAreas = props.commonAreas;
  }

  static fromPrisma(data: ResidentialComplexProps) {
    return new ResidentialComplex({
      id: data.id,
      nit: data.nit,
      name: data.name,
      slug: data.slug,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      logo: data.logo,
      primaryColor: data.primaryColor,
      secondaryColor: data.secondaryColor,
      isActive: data.isActive,
      commonAreas: data.commonAreas,
    });
  }
}
