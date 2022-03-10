import styled from '@emotion/styled'
import { totalmem } from 'os'
import React, { Fragment } from 'react'
import { getColor } from '../../utils/theme'
import { Container, Image, Text } from '../ui'
import SlideShow from '../ui/slide-show'

const StyledPropertyCard = styled(Container)`
  max-height: 450px;
  min-height: 250px;
  overflow: hidden;
  flex-direction: row;
  .properties-pictures {
    border: 1px solid ${getColor('primary')};
    border-radius: 25px;
    overflow: hidden;
  }
  .properties-details-container {
    padding: 16px;
    gap: 32px;
    h2 {
      text-align: center;
      font-size: 32px;
      color: ${getColor('primary')}
    }
    h3 {
      font-size: 28px;
      text-overflow: ellipsis;
      font-weight: 400;
      line-height: 42px;
      -webkit-line-clamp: 5;
      flex: 1;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      color: ${getColor('dark')};
      text-align: center;
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
    price_total: number
    description: { es: string }
    currency: string
  }
}
export const PropertyCard = (props: PropertyCardType) => {
  const { data } = props
  const {
    name,
    price_total,
    description,
    currency
  } = data
  console.log({data})

  const propertyImages:any = props.data.images?.map(({name: imgName, imgUrl}: any) => ({
    slideCaption: imgName,
    slideImage: {
      asset: imgUrl,
      alt: imgName
    }
  }))

  return (
    <StyledPropertyCard>
      <Container className='properties-pictures' maxWidth='60%' >
        {props.data?.images && <SlideShow data={propertyImages} />}
      </Container>
      <Container className='properties-details-container' maxWidth='40%' >
        <Container>
          <Text textType='h2'>
            {name}
          </Text>
        </Container>
        <Container flex="1">
          <Text textType='h3'>
            {description?.es}
          </Text>
        </Container>
        <Container>
          <Text textType='h2'>
            {price_total && `$${Number(price_total).toFixed(2)} ${currency}`}
          </Text>
        </Container>
      </Container>
    </StyledPropertyCard>
  )
}

export default PropertyCard