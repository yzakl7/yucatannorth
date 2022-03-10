import styled from '@emotion/styled'
import React, { useState } from 'react'
import { InvestmentCard, Map, PropertyCard } from '../components/layout'
import { Container } from '../components/ui'

const StyledSaved = styled(Container)`
    gap: 64px;
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

const cardArray = [cardContent, cardContent]


const Saved = ({properties}) => {
  
  const renderInvestmentCards = () => {
    return (
      <Container className='investment-cards-container'>
        {cardArray.map((cardProps) => <InvestmentCard key={`${Math.random()}`} {...cardProps}/>)}
      </Container>
    )
    
  }
  const renderPropertyCards = () => {
    return (
      <Container className="property-cards-container">
        { [properties[0]].map((data:any) => <PropertyCard key={data.id} data={data} />) }
      </Container>
    )
  }
  return (
    <StyledSaved>
      {renderPropertyCards()}
      {renderInvestmentCards()}
      <Map />
    </StyledSaved>
  )
}

export default Saved