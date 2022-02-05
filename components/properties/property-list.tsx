import styled from '@emotion/styled'
import React from 'react'
import Container from '../UI/style/container'
import { PropertyProps } from './types'
import { FileIcon } from '../UI/style/file-icon'
import { HiOutlineHome } from 'react-icons/hi'
import { GrStatusUnknown } from 'react-icons/gr'
import { FcDepartment } from 'react-icons/fc'
import { BiBuildingHouse } from 'react-icons/bi'
import { FaDrawPolygon, FaRegStar } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { Text } from '../UI/style/text'

const StyledPropertyList = styled(Container)`
  flex-wrap: wrap;
  align-items: flex-start;
  background: white;
  gap: 32px;
  flex:1;
  padding: 16px;
  flex-direction: column;
  .property-element {
    cursor: pointer;
    border-radius: 3px;
    &:hover {
      background: rgba(0,0,0,0.15);
    }
  }
`

type PropertyListProps = {
  data: PropertyProps[]
}

export const PropertyList = ({data}: PropertyListProps) => {
  const { push } = useRouter()
  const icons:any = {
    house: <HiOutlineHome />,
    land: <FaDrawPolygon />,
    townhouse: <BiBuildingHouse />,
    premiumLand: <FaRegStar />,
    apartment: <FcDepartment />,
  }
  const beach = data.filter(property => property.area === 'beach')
  const city = data.filter(property => property.area === 'city')
  return (
    <StyledPropertyList>
      {beach.length > 0 && (

        <Container>
          <Text textType='h4'>
            Playa
          </Text>
          <Container direction="row" wrap='wrap'>
            {
              beach.map((property:PropertyProps) => { return (
                <Container className="property-element" key={property.id}>
                  <FileIcon onClick={() => push(`/properties/edit/${property.id}`)} icon={icons[property.property_type] || <GrStatusUnknown />} label={property.name}/>
                </Container>
              )})
            }
          </Container>
        </Container>
      )}

      {city.length > 0 && (

        <Container>
          <Text textType='h4'>
            Ciudad
          </Text>
          <Container direction="row" wrap='wrap'>
            {
              city.map((property:PropertyProps) => { return (
                <Container className="property-element" key={property.id}>
                  <FileIcon onClick={() => push(`/properties/edit/${property.id}`)} icon={icons[property.property_type] || <GrStatusUnknown />} label={property.name}/>
                </Container>
              )})
            }
          </Container>
        </Container>
      )}
    </StyledPropertyList>
  )
}
