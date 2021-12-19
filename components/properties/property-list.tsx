import styled from '@emotion/styled'
import React from 'react'
import Container from '../UI/style/container'
import { PropertyProps } from './types'
import { FileIcon } from '../UI/style/file-icon'
import { HiOutlineHome } from 'react-icons/hi'
import { GrStatusUnknown } from 'react-icons/gr'
import { FaDrawPolygon } from 'react-icons/fa'
import { useRouter } from 'next/router'

const StyledPropertyList = styled(Container)`
  flex-wrap: wrap;
  align-items: flex-start;
  background: white;
  gap: 32px;
  flex:1;
  padding: 16px;
  flex-direction: row;
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
    land: <FaDrawPolygon />
  }
  return (
    <StyledPropertyList>
      {
        data.map((property:PropertyProps) => { return (
          <Container className="property-element" key={property.id}>
            <FileIcon onClick={() => push(`/properties/edit/${property.id}`)} icon={icons[property.property_type] || <GrStatusUnknown />} label={property.name}/>
          </Container>
        )})
      }
    </StyledPropertyList>
  )
}
