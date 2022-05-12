import React from 'react'
import styled from 'styled-components'
import { getColor } from '../../utils/theme'
import { Container, Image, Text } from '../ui'

const StyledRelatedBrands = styled(Container)`
  .top-container {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    .side {
      min-width: 265px;
      flex:1;
    }
  }
  .bottom-container {
    .images-container {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      gap: 16px;
      padding: 32px 0;
      .image-wrapper {
        width: 100px;
        .image-container {
          flex: 1;
          width: 100%;
          overflow: hidden;
          img {
            object-fit: contain;
          }
        }
      }
    }
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

const brands = [
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FAJUSA.png?alt=media&token=ffedfce2-9086-4bb9-9621-7e1b15305f22`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FANILLOS%20HASTINGS.png?alt=media&token=5049ec82-1daa-45e7-a302-df9508f1324d`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FARBOMEX.jpg?alt=media&token=628b3680-a55e-4afa-b3da-84426816b235`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FATSUGUI.jpg?alt=media&token=3a780b30-bd0d-4225-83ca-0872a467e499`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FCHAMPIONS.png?alt=media&token=76c5ed92-41d4-4393-9e1a-5b7a553e2ab6`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FCHROMITE.png?alt=media&token=703c7071-5bb4-4144-9bda-1344186a7694`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FCLEMEX.jpg?alt=media&token=e5d80569-23bc-4ce1-9a07-551d43a84903`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FCLOYES.png?alt=media&token=d138f462-e017-42ca-b6cf-3acc5f8316c2`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FCLOYES.png?alt=media&token=d138f462-e017-42ca-b6cf-3acc5f8316c2`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FDC%20AUTO%20PARTS.png?alt=media&token=b5447a41-31c7-49f7-a8f4-503ea8ec6e06`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FDYNAGEAR.png?alt=media&token=31a3405b-afba-4c3b-ada7-19b72f0478f3`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FFM.png?alt=media&token=9d9c0f9d-01aa-4ba3-82b9-1f422d4aab3e`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FFRACO.png?alt=media&token=407f3a41-0818-475b-a96f-20814f1ee1ff`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FGARANTI.jpg?alt=media&token=ab8b2bda-a8e9-4667-8525-17f9c802ba9d`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FKING%20RACINGS.png?alt=media&token=afb53a4f-92f4-4a3b-a03f-865d809078d2`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FKING.png?alt=media&token=f6f1c6fa-e43e-4736-b31e-14ba5d008ab8`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FLODI.jpg?alt=media&token=10bdaa1f-6437-46fd-b807-19010f37265c`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FMAHLE.jpg?alt=media&token=394c5d60-7603-4d34-b8cc-f91294ccaffc`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FMELLING.jpg?alt=media&token=3a60641e-539b-40b1-b17f-31ee6ed4b586`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FMETALBOND.jpg?alt=media&token=c0731c93-befc-453b-b843-6b9ad5272456`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FMORESA.png?alt=media&token=22a17da4-05b1-4a5e-b052-f8382d653750`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FNPR%20ANILLOS.jpg?alt=media&token=278097ff-c5c5-4fb3-b001-24c4d52f8574`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FPurolator.png?alt=media&token=6a6142ae-11ff-489c-b00d-c49e987c046b`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FSEALED%20POWER.png?alt=media&token=4e914c0f-67b3-44fe-ac53-9dcb57221b34`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FSELLO%20V.png?alt=media&token=cbd805ad-5a58-4e45-830d-7c314967a30d`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FSPQ.png?alt=media&token=b9569ab3-21d9-4c97-b8cb-e149d8b2a02c`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FTF%20QUIMICA.jpg?alt=media&token=401b4edd-900f-4a4a-8a97-3deb66245f0e`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2FTF%20VICTOR%20EMPAQUES.jpg?alt=media&token=1ebc488d-4030-4bad-ac65-5459f22afa8e`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2Fraloy.jpg?alt=media&token=4028c1ea-755c-48e5-9ef3-ddbda8cef9ba`,
  `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fbrands%2Fvehyco.png?alt=media&token=90f43ca8-cb0d-4f15-9b2e-19f68cac451e`,
]
const piece_1 = `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Ftuercas.png?alt=media&token=646601f7-a5e8-4655-8665-f008649b7e4f`
const piece_2 = `https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fobjeto_con_huecos.png?alt=media&token=7220f267-f77b-4ef9-8390-3870a12222d4`

export const RelatedBrands = () => {
  return (
    <StyledRelatedBrands>
      <Container className='top-container'>
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
      </Container>
      <Container className='bottom-container'>
        <Text textType="h2">
          Más de <span>10</span> proveedores especializados.
        </Text>
        <Container className='images-container'>
          {
            brands.map((src) => (
              <Container className='image-wrapper' key={src}>
                <Image src={src} alt='brand-logo' />
              </Container>
            ))
          }
        </Container>
      </Container>
    </StyledRelatedBrands>
  )
}
export default RelatedBrands