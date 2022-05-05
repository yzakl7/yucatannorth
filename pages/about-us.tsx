import React from 'react'
import styled from 'styled-components'
import { Container, Text } from '../components/ui'
import { getColor } from '../utils/theme'

const StyledAboutUs = styled(Container)`
  padding: 64px;
  gap: 64px!important;
  @media (max-width: 720px) {
    padding: 32px;

  }
  @media (max-width: 460px) {
    padding: 16px;
    
  }
  .title-container {
    gap: 32px;
    h3 {
      color: ${getColor('primary')};
      text-align: center;
      font-weight: 700;
      font-size: 36px;
      line-height: 54px;
      @media (max-width: 720px) {
        font-size: 28px;
        line-height: 34px;
      }
    }
  }
  .subtitle-container {
    h4 {
      font-weight: 700;
      font-size: 30px;
      line-height: 48px;
      @media (max-width: 720px) {
        font-size: 20px;
        line-height: 28px;
      }
    }
  }
  .section {
    flex-wrap: wrap;
    .side {
      min-width: 270px;
      p {
        font-size: 22px;
        @media (max-width: 720px) {
          font-size: unset;
        }
      }
    }
  }
`

const texts = [
  {
    id: 3424234234,
    text: `
      La empresa fue fundada en 2003 por Sebastián Solís. 
      Su experiencia y conocimiento en la industria 
      automotriz, laborando en la empresa Sealed Power, 
      del Grupo Carso, por más más de 15 años 
      es uno de los pilares de la empresa. 
    `
  },
    {
    id: 345634563456,
    text: `
      Una de las características más importantes de la empresa es
      que se especializa por conseguir partes y refacciones del
      motor complicadas.
      Los años de experiencia en el ramo han permitido a los 
      especialistas de la empresa encontrar refacciones para
      autos muy antiguos, o muy recientes, así como modelos 
      de edición limitada.
    `
  },
    {
    id: 4567456768,
    text: `
      Para 2009, y gracias a los frutos del trabajo 
      y la experiencia, la empresa se trasladó al oriente  
      de la ciudad de Mérida, en una avenida estrategia 
      para el ramo automotriz.
      La calle 65 por 28 y 32, no. 284 en el Centro de la
      ciudad de Mérida. Desde entonces se ha
      continuado dando el mejor servicio desde esta ubicación
    `
  },
    {
    id: 3569939699,
    text: `
      Cabe destacar que la empresa tiene como su principal zona 
      de influencia comercial los polígonos vulnerables: 
      Polígono 108, Melchor Ocampo II, Fidel Velázquez II Etapa, 
      Los Reyes, Amalio Solornsano, Nueva Chichen, Brisas del Sur etc.
    `
  },
    {
    id: 797979397997,
    text: `
      En 2012 y 2015 se adquirió equipo de reparto para
      poder ofrecer un mejor servicio a nuestros clientes,
      integrando con esto servicio a domicilio, 
      dentro de la ciudad de Mérida
    `
  },
]

export const AboutUs = () => {
  return (
    <StyledAboutUs>
      <Container className="title-container">
        <Text textType="h3">Nosotros</Text>
      </Container>
      <Container className="subtitle-container">
        <Text textType="h4">Historia:</Text>
      </Container>
      {
        texts.map(({id, text}: Record<string, string | number>, i:number) => (
          <Container direction='row' className='section' key={id}>
            <Container flex='1' className='left side'>
              <Text textType='p'>
                {(i%2 === 0) ? text : ''}
              </Text>
              </Container>
            <Container flex='1' className='right side'>
              <Text textType='p'>
                {(i%2 !== 0) ? text : ''}
              </Text>
              </Container>
          </Container>
        ))
      }
    </StyledAboutUs>
  )
}
export default AboutUs  