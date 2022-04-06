import { useRouter } from 'next/router';
import React from 'react'
import styled from 'styled-components';
import { Map } from '../../components/layout';
import { Container, Text } from '../../components/ui';
import SlideShow from '../../components/ui/slide-show';
import { getColor } from '../../utils/theme';

const StyledPropertyDetails = styled(Container)`
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
    p {
      font-size: 24px;
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
          font-size: 11px;
          letter-spacing: 2px;
          font-weight: 600;
          color: ${getColor('white')};
          background: ${getColor('primary')};
          line-height: 11px;
          padding: 4px;
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
`

export const PropertyDetails = (props:any) => {
  const { query } = useRouter()
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

  const tagKeys:any = {
    "bathrooms": "Baños",
    "rooms": "Cuartos",
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
      Object.keys(measures).forEach((measure) => measures[measure] && tags.push({value: measures[measure], tagName: tagKeys[measure]}))
      Object.keys(features).forEach((feature) => features[feature] && tags.push({value: features[feature], tagName: tagKeys[feature]}))
      
      return (
        <Container className='tags-container'>
          {tags.map(({value, tagName}:any) => (
            <Container className='tag-container' key={tagName}>
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
        {propertyDetails?.name && <Text textType='h2'>{propertyDetails?.name}</Text>}
        {propertyDetails?.description.es && <Text textType='p'>{propertyDetails?.description.es}</Text>}
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
