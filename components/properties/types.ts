export type AddressType = {
  line_1: string,
  suburb: string,
}

export type SlidesType = {
  slideCaption?: string
  slideImage: {
    asset: string
    alt: string
  }
}

export type PropertyProps = {
  name: string,
  currency: string,
  id:string,
  area:string,
  images?: SlidesType[],
  address?: AddressType,
  description: string[],
  property_type: string,
  location: string,
  price_total?: number,
  price_m2?: number,
  measures?: any
}