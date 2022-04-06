import React from 'react'
import styled from 'styled-components'
import { getColor } from '../../utils/theme'
import { Container, Image, Text } from '../ui'

const StyledEventsAndPromotions = styled(Container)`
  .title-container {
    gap: 32px;
    h3 {
      color: ${getColor('primary')};
      text-align: center;
      font-weight: 700;
      font-size: 36px;
      line-height: 54px;
    }
  }
`

const promoImage = 'https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Frefacciones-solis-promos.png?alt=media&token=aeb6b622-54c9-4f65-b36d-b62842180df1'

export const EventsAndPromotions = () => {
  return (
    <StyledEventsAndPromotions>
      <Container className="title-container">
        <Text textType="h3">Eventos y promociones</Text>
        <Image alt="¡promociones!" src={promoImage} />
      </Container>
    </StyledEventsAndPromotions>
  )
}

export default EventsAndPromotions