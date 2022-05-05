import React from 'react'
import styled from 'styled-components'
import { getColor } from '../../utils/theme'
import { Container, Image, Text } from '../ui'

const StyledRelatedBrands = styled(Container)`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  .side {
    min-width: 265px;
    flex:1;
  }
  h3 {
    max-width: 175px;
    text-align:center;
    span {
      color: ${getColor('primary')};
    }
    line-height: 24px;
    @media(min-width: 721px) {
      font-size: 24px; 
      max-width: 275px;
      line-height: 34px;
    }
  }

`
const image = "https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Frefacciones-solis-marcas.png?alt=media&token=cb6e24a3-70a7-4591-93c8-f762f161f3ec"
const piece_1 = `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Ftuercas.png?alt=media&token=646601f7-a5e8-4655-8665-f008649b7e4f`
const piece_2 = `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fobjeto_con_huecos.png?alt=media&token=7220f267-f77b-4ef9-8390-3870a12222d4`

export const RelatedBrands = () => {
  return (
    <StyledRelatedBrands>
      <Container className='left side'>
        <Image src={piece_1} alt="pieza de motor de ejemplo"/>
      </Container>
      <Container className='right side' align='center'>
        <Text textType="h2">
          <span>M</span>ás de <span>22</span> años de experiencia.
        </Text>
        <Text textType="h3">
          <span>E</span>specialistas en piezas difíciles de encontrar.
        </Text>
        <Image src={piece_2} alt="otra pieza de motor de ejemplo"/>
      </Container>
    </StyledRelatedBrands>
  )
}
export default RelatedBrands