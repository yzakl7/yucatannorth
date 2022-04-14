import styled from '@emotion/styled'
import React, { Fragment } from 'react'
import { getColor } from '../../utils/theme'
import { Container, Image, Text } from '../ui'
import SlideShow from '../ui/slide-show'
import { v4 as uuid} from 'uuid';
import { useRouter } from 'next/router'

const StyledPropertyCard = styled(Container)`
  flex-wrap: wrap;
  flex-direction: row;
  .properties-pictures {
    border: 1px solid ${getColor('primary')};
    border-radius: 25px;
    overflow: hidden;
    height: 350px;
    min-width: 375px;
    @media (max-width: 720px) {
      height: 250px;
      min-width: 275px;
    }
    @media (max-width: 420px) {
      height: 250px;
    }
  }
  .properties-details-container {
    min-width: 475px;
    padding: 16px;
    justify-content: center;
    gap: 32px;
    @media (max-width: 650px) {
      min-width: 200px;
    }
    h2 {
      text-align: center;
      font-size: 36px;
      line-height: 36px;
      color: ${getColor('primary')}
    }
    h3 {
      line-height: 32px;
      font-size: 24px;
      text-overflow: ellipsis;
      font-weight: 400;
      letter-spacing: 4px;
      -webkit-line-clamp: 5;
      flex: 1;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      color: ${getColor('dark')};
      text-align: center;
      @media (max-width: 932px){
        line-height: 22px;
        font-size: 15px;
        text-overflow: ellipsis;
        font-weight: 400;
        letter-spacing: 1px;
        -webkit-line-clamp: 25;
        flex: 1 1 0%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-align: center;
      }
    }
    h4 {
      text-align: right;
    }
  }
`

type PropertyCardType = {
  data: {
    images: Record<string, string>[]
    name: string
    id: string
    price_total: number
    shortDescription: { es: string }
    currency: string
  }
}

export const PropertyCard = (props: PropertyCardType) => {
  const { push } = useRouter()
  const { data } = props
  if (!data) {
    return <>Loading</>
  }
  const {
    name,
    price_total,
    shortDescription,
    currency,
    id
  } = data

  const propertyImages:any = props.data.images?.map(({name: imgName, imgUrl}: any) => ({
    slideCaption: imgName,
    slideImage: {
      asset: imgUrl,
      alt: imgName
    }
  }))
  
  const onPropertySelect = () => {
    push({
      pathname: `/properties/${name.replaceAll(' ', '_')}`,
      query: { id, name }
    },`/properties/${name.replaceAll(' ', '_')}`)
  }

  return (
    <StyledPropertyCard >
      <Container className='properties-pictures' flex='1' >
        {props.data?.images && <SlideShow data={propertyImages} />}
      </Container>
      <Container onClick={() => onPropertySelect()} className='properties-details-container' flex='1.2'>
        <Container>
          <Text textType='h2'>
            {name}
          </Text>
        </Container>
        <Container>
          <Text textType='h3'>
            {shortDescription?.es}
          </Text>
        </Container>
        <Container>
          <Text textType='h2'>
            {price_total && `${Intl.NumberFormat('es-MX',{style:'currency',currency: currency.toUpperCase()}).format(price_total)} ${currency}`}
          </Text>
        </Container>
      </Container>
    </StyledPropertyCard>
  )
}

export default PropertyCard