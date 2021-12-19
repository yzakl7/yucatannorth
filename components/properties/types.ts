export type AddressType = {
  line_1: string,
  suburb: string,
}

export type PropertyProps = {
  name: string,
  currency: string,
  id:string,
  address?: AddressType,
  description: string[],
  property_type: string,
  price_total?: number,
  price_m2?: number,
  measures?: any
}