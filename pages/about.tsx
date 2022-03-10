import styled from '@emotion/styled'
import React from 'react'
import { AboutCard, Map } from '../components/layout'
import { Container } from '../components/ui'

const StyledAbout = styled(Container)`
  gap: 64px;
  padding: 100px;
  .about-cards-container {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 64px;
  }
`

const cardContent = {
  title: 'Fernando Berzunza',
  subtitle: 'Atención personalizada',
  description: 'Pellentesque augue odio, faucibus sed porttitor ac, convallis vel libero. Quisque sit amet accumsan enim. Mauris ornare urna in velit mattis, id molestie neque mattis',
  image: 'https://www.jeancoutu.com/globalassets/revamp/photo/conseils-photo/20160302-01-reseaux-sociaux-profil/photo-profil_301783868.jpg'
}

const cardContent2 = {
  title: '¿Porqué elegir Yucatán North?',
  subtitle: 'Fernando Berzunza',
  description: 'Más de 8 años de experiencia',
  image: 'https://h5p.org/sites/default/files/styles/medium-logo/public/logos/chart-icon-color.png?itok=kpLTYHHJ'
}

const cardContent3 = {
  title: 'Lorem ipsum',
  subtitle: 'lorem impsum',
  description: 'In scelerisque diam a felis iaculis pretium quis ut elit. Morbi velit velit, aliquet quis vehicula id, tempus sed tortor. ',
  image: "data:image/png;base64,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"
}


const cardArray = [cardContent, cardContent2, cardContent3, cardContent3]

const renderCards = () => {
  return (
    <Container className='about-cards-container'>
      {cardArray.map((cardProps) => <AboutCard key={`${Math.random()}`} {...cardProps}/>)}
    </Container>
  )
  
}

const about = () => {
  return (
    <StyledAbout>
      {renderCards()}
      <Map />
    </StyledAbout>
  )
}

export default about