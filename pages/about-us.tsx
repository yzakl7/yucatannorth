import React from 'react'
import styled from 'styled-components'
import { Container, Image, Text } from '../components/ui'
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
    align-items: center;
    gap: 32px;
    margin-top: -32px;
    margin-bottom: -32px;
    flex-wrap: wrap;
    &:nth-of-type(2n) {
      @media (max-width: 720px) {
        flex-direction: column-reverse;
        margin-top: 4px;
        margin-bottom: 4px;
      }
    }
    &:nth-last-of-type(1) {
      padding-bottom: 64px;
    }
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
const history1 = `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fhistoria_1.jpg?alt=media&token=1d5343ed-07a4-4e60-9e62-f31362930774`
const history2 = `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fhistoria_2.jpg?alt=media&token=2228610f-cf5f-4d73-a321-6ac2074c007d`
const history3 = `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fhistoria_3.jpg?alt=media&token=4fccc9bb-a7ef-4bac-b871-38ab9abb39c0`
const history4 = `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fhistoria_4.jpg?alt=media&token=7d0af520-f070-4334-bfb0-9c63308168cf`
const history5 = `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fhistoria_5.jpg?alt=media&token=1d0bd8aa-9d12-4bf7-a991-7321568d4dd6`

const texts = [
  {
    img: history1,
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
    img: history2,
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
    img: history3,
    id: 4567456768,
    text: `
      Para 2009, y gracias a los frutos del trabajo 
      y la experiencia, la empresa se trasladó al oriente  
      de la ciudad de Mérida, en una avenida estrategia 
      para el ramo automotriz.
      La calle 65 por 30 y 32, no. 284 en el Centro de la
      ciudad de Mérida. Desde entonces se ha
      continuado dando el mejor servicio desde esta ubicación
    `
  },
    {
    img: history4,
    id: 3569939699,
    text: `
      Cabe destacar que la empresa tiene como su principal zona 
      de influencia comercial más importante: Polígono 108, Melchor Ocampo II,
      Fidel Velázquez II Etapa, Los Reyes, Amalia Solorsano, Nueva Chichen,
      Brisas del Sur etc.
    `
  },
    {
    img: history5,
    id: 797979397997,
    text: `
      Contamos con equipo de reparto para
      poder ofrecer un mejor servicio a nuestros clientes,
      integrando con esto servicio a domicilio, 
      dentro de la ciudad de Mérida.
      Tambien surtimos al interior del estado y estados
      vecinos como Campeche y Quintana Roo
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
        texts?.map(({id, text, img}: any, i:number) => (
          <Container direction='row' className='section' key={id}>
            <Container flex={(i%2 !== 0) ? '1' : '1.5'}  className='left side'>
              {(i%2 === 0) ? <Text textType='p'>{text}</Text> : <Image src={img} alt=""/>}
            </Container>
            <Container flex={(i%2 === 0) ? '1' : '1.5'} className='right side'>
              {(i%2 !== 0) ? <Text textType='p'>{text}</Text> : <Image src={img} alt=""/>}
            </Container>
          </Container>
        ))
      }
    </StyledAboutUs>
  )
}
export default AboutUs  