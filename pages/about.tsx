import styled from '@emotion/styled'
import React from 'react'
import { AboutCard, Map } from '../components/layout'
import { Container } from '../components/ui'

const StyledAbout = styled(Container)`
  gap: 64px;
  padding: 100px;
  align-items: center;
  @media (max-width: 720px) {
    padding: 32px;
  }
  @media (max-width: 475px) {
    padding: 16px;
  }
  .about-cards-container {
    flex-direction: row;
    max-width: 1024px;
    flex-wrap: wrap;
    gap: 64px;
  }
`

const cardContent = {
  title: 'Fernando Berzunza Máster Broker',
  subtitle: 'Atención personalizada',
  description: 'Trabajamos de la mano con el inversionista para salvaguardar los recursos y el proceso legal hasta el momento del intercambio de partes.',
  image: 'https://www.jeancoutu.com/globalassets/revamp/photo/conseils-photo/20160302-01-reseaux-sociaux-profil/photo-profil_301783868.jpg'
}

const cardContent2 = {
  title: '¿Por qué elegir Yucatán North?',
  subtitle: 'Más de 8 años de experiencia',
  description: 'En Yucatán North buscamos cuidar las necesidades de nuestros clientes. Porque sabemos que una buena calidad en la información restará o disminuirá cualquier tipo de riesgo que pudiera presentarse.',
  image: 'https://firebasestorage.googleapis.com/v0/b/yucatan-north-web.appspot.com/o/web%20assets%2Fabout_us%2FSUBIDA.jpg?alt=media&token=9c8a865e-4d97-4faa-aeba-25f047014199'
}

const cardContent3 = {
  title: 'Grandes inversiones y grandes historias',
  subtitle: 'Invierte en las mejores opciones',
  description: 'En Yucatán North buscamos que la consultoría en la información inmobiliaria amplié la visión de que lo se está invirtiendo se convierta en tu gran historia de éxito.',
  image: "https://firebasestorage.googleapis.com/v0/b/yucatan-north-web.appspot.com/o/web%20assets%2Fabout_us%2FCASA.jpg?alt=media&token=2dc9e53d-ba2d-45f5-81d5-4c4031c5e59c"
}

const cardContent4 = {
  title: 'Equipo enfocado al servicio de calidad',
  subtitle: 'Cuidamos la información compartida',
  description: 'Cada integrante está dedicado a brindar información veraz y valiosa.',
  image: "https://firebasestorage.googleapis.com/v0/b/yucatan-north-web.appspot.com/o/web%20assets%2Fabout_us%2FEQUIPO.jpg?alt=media&token=fc565268-f599-4924-aa57-eb2770ffe681"
}

const cardArray = [cardContent, cardContent2, cardContent3, cardContent4  ]

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