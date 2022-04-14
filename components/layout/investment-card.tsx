import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React from 'react'
import { getColor } from '../../utils/theme'
import { Container, Image, Text } from '../ui'

const StyledInvestmentCard = styled(Container)`
  overflow: hidden;
  width: calc(50% - 16px);
  height: 450px;
  border-radius: 20px;
  padding: 32px;
  gap: 32px;
  justify-content: center;
  align-items: center;
  @media (max-width: 720px) {
    height: 250px;
    width: 100%;
  }
  .image-container {
    position: absolute;
    top: 0;
    z-index: -1;
  }
  h3, p {
    color: ${getColor('white')};
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: ${getColor('black')};
    text-shadow: 1px 1px 3px ${getColor('black')};
    text-align: center;
  }
  h3 {
    font-size: 28px;
  }
  p {
    font-size: 24px;
  }
  img {
    object-fit: cover;
    height: 100%;
  }
`


export const InvestmentCard = (card: Record<string, any>) => {
  const { push } = useRouter()
  const {shortDescription, images, name, id} = card
  const onInvestmentSelect = () => {
    push({
      pathname: `/properties/${name.replaceAll(' ', '_')}`,
      query: { id, name }
    },`/properties/${name.replaceAll(' ', '_')}`)
  }
  return (
    <StyledInvestmentCard  onClick={() => onInvestmentSelect()}>
      <Text textType='h3'>{name}</Text>
      <Text textType='p'>{shortDescription?.es}</Text>
      {images && <Image src={images[0].imgUrl} alt={name} />}
    </StyledInvestmentCard>
  )
}

export default InvestmentCard