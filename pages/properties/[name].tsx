import { useRouter } from 'next/router';
import React from 'react'
import styled from 'styled-components';
import { Button } from '../../components/inputs';
import { Map } from '../../components/layout';
import { Container, Text } from '../../components/ui';
import SlideShow from '../../components/ui/slide-show';
import { getColor } from '../../utils/theme';

const StyledPropertyDetails = styled(Container)`
  * {
    font-family: 'ABeeZee',sans-serif;
  }
  .property-slideshow-container {
    padding: 16px;
    max-height: 750px;
  }
  .body-container {
    padding: 16px;
    gap: 32px;
    h2 {
      text-align: center;
      color: ${getColor('primary')};
      font-size: 36px;
      line-height: 42px

    }
    h3 {
      text-align: center;
      color: ${getColor('primary')};
      font-size: 26px;
    }
    p {
      font-size: 20px;
      text-align: center;
      line-height: 28px;
    }
    .tags-container {
      flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      .tag-container {
        flex-direction: row;
        gap: 0;
        border: 1px solid;
        border-color: ${getColor('border')};
        border-radius: 5px;
        p {
          font-size: 15px;
          letter-spacing: 1px;
          font-weight: 600;
          color: ${getColor('white')};
          background: ${getColor('primary')};
          line-height: 15px;
          padding: 10px;
        }
      }
    }
    .address-container {
      p {
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        color: ${getColor('dark')}
      }
    }
  }
  button.custom {
    border: 1px solid;
    height: 40px;
    color: ${getColor('white')};
    background: ${getColor('success')};
    border-radius: 5px;
    &.disabled {
      background: ${getColor('border')};
    }
  }
`

export const PropertyDetails = (props:any) => {
  const { query, push } = useRouter()
  const propertyDetails = props.properties.find(({id}:Record<string, string>) => {
    return id === query.id
  })

  const propertyImages:any = propertyDetails?.images?.map(({name: imgName, imgUrl}: any) => ({
    slideCaption: imgName,
    slideImage: {
      asset: imgUrl,
      alt: imgName
    }
  }))

  const downloadPDF = () => {
    push(propertyDetails.pdf.fileURL)
  }

  const tagKeys:any = {
    "bathrooms": "Baños",
    "rooms": "Recámaras",
    "car_slots": "Cajones de estacionamiento",
    "floors": "Pisos",
    "bottom": "Fondo",
    "front": "Frente",
    "land_area": "Terreno",
    "left": "Izquierda",
    "built_area": "Construcción",
    "right": "Derecha"
  }

  const renderTags = () => {
    if (propertyDetails) {
      const {measures, features} = propertyDetails;
      const tags:any = []

      if (measures) {
        Object.keys(measures).forEach((measure) => measures[measure] && tags.push({value: measures[measure], tagName: tagKeys[measure]}))
      }
      if (features) {
        Object.keys(features).forEach((feature) => features[feature] && tags.push({value: features[feature], tagName: tagKeys[feature]}))
      }
      
      return (
        <Container className='tags-container'>
          {tags.map(({value, tagName}:any) => (
            <Container className='tag-container' key={Math.random()}>
              <Text textType='p'>
                {tagName}
              </Text>
              <Text textType='p'>
                {value}
              </Text>
            </Container>
          ))}
        </Container>
      )
    }
    return 'loading'
    }

  return (
    <StyledPropertyDetails>
      <Container className='property-slideshow-container'>
        {propertyDetails?.images && <SlideShow data={propertyImages} />}
      </Container>
      <Container className='body-container'>
        <Container>
          {propertyDetails?.name && <Text textType='h2'>{propertyDetails?.name}</Text>}
          {propertyDetails?.price && <Text textType='h3'>{propertyDetails?.price }</Text>}
        </Container>
        {propertyDetails?.description && <Text textType='p'>{propertyDetails?.description}</Text>}
        {propertyDetails?.pdf && (
          <Container align='center'>
            <Button action={downloadPDF} buttonStyle='custom'>
              <Text textType='p'>
                Descargar PDF
              </Text>
            </Button>
          </Container>
        )}
        {renderTags()}
        {propertyDetails?.address?.mapSrc && <Map src={propertyDetails?.address?.mapSrc}/>}
        <Container className='address-container'>
          {propertyDetails?.address?.line_1 && <Text textType='p'>{propertyDetails?.address?.line_1}</Text>}
          {propertyDetails?.address?.suburb && <Text textType='p'>{propertyDetails?.address?.suburb}</Text>}
        </Container>
      </Container>
      
    </StyledPropertyDetails>
  )
}

export default PropertyDetails
