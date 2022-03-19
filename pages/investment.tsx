import styled from '@emotion/styled'
import React from 'react'
import { InvestmentCard } from '../components/layout'
import { Container } from '../components/ui'

const StyledInvestment = styled(Container)`
  padding: 32px;
  .investment-cards-container {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 32px;
  }
`

const cardContent = {
  title: 'LA COSTA COMO NUNCA IMAGINASTE',
  tagline: 'Exclusivo desarrollo de 12 villas',
  image: 'https://images.adsttc.com/media/images/5be9/fd5c/08a5/e5a5/8c00/008f/large_jpg/CARLES_FAUS_ARQUITECTURA_-_CARMEN_HOUSE_(2).jpg?1542061390'
}

const cardArray = [cardContent, cardContent, cardContent]

const renderCards = () => {
  return (
    <Container className='investment-cards-container'>
      {cardArray.map((cardProps) => <InvestmentCard key={`${Math.random()}`} {...cardProps}/>)}
    </Container>
  )
  
}

const investment = () => {
  return (
    <StyledInvestment>
      {renderCards()}
    </StyledInvestment>
  )
}

export default investment