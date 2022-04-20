import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { InvestmentCard, Map, PropertyCard } from '../components/layout'
import { Container, Text } from '../components/ui'

type FavoritesProps = {
  properties: any
}

const StyledFavorites = styled(Container)`
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


const Favorites = ({properties}: FavoritesProps) => {

  const [investmentsArray, setInvestmentsArray] = useState([])
  const [propertiesArray, setPropertiesArray] = useState([])

  useEffect(() => {
    const stringArray = localStorage.getItem('favorites') || '[]'
    const idsArray = JSON.parse(stringArray)
    const reduceResult = idsArray.reduce((acc:any, curr:any) => {
      const propertyDetails = properties.find(({id}:any) => {
        return (id === curr)
      })
      return [...acc, propertyDetails]
    }, [])

    if (reduceResult) {
      const newInvestmentsArray = reduceResult.filter((filter:any) => filter?.type !== 'propiedad')
      const newPropertiesArray = reduceResult.filter((filter:any) => filter?.type === 'propiedad')
      setInvestmentsArray(newInvestmentsArray)
      setPropertiesArray(newPropertiesArray)
    }
  }, [properties])
  
  
  const renderInvestmentCards = () => {
    return (
      <Container className='investment-cards-container'>
        {investmentsArray.map((cardProps) => <InvestmentCard key={`${Math.random()}`} {...cardProps}/>)}
      </Container>
    )
    
  }
  const renderPropertyCards = () => {
    return (
      <Container className="property-cards-container">
        { propertiesArray.map((data:any) => <PropertyCard key={`${Math.random()}`} data={data} />) }
      </Container>
    )
  }

  return (
    <StyledFavorites>
      {renderPropertyCards()}
      {renderInvestmentCards()}
      {
        (!investmentsArray.length && !propertiesArray.length) && <Text textType='p'>Para agregar propiedades a favoritos, haga clic en el ícono de corazón situado en la esquina superior derecha en cada propiedad.</Text>
      }
      <Map />
    </StyledFavorites>
  )
}

export default Favorites