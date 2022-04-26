import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { PropertyCard } from "../components/layout";
import { Container } from '../components/ui'

type AdminProps = {
  properties: []
}

const StyledProperty = styled(Container)`
  flex: 1;
  padding: 32px;
  .property-cards-container {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 32px;
  }
`

const Property = ({properties}: AdminProps) => {
  const [filteredList, setFilteredList] = useState<[]>([]);
  const renderCards = () => {
    return (
      <Container className='property-cards-container'>
        {filteredList.map((data:any) => <PropertyCard key={data.id} data={data}/>)}
      </Container>
    )
  }

  useEffect(() => {
    const filteredProperties:any = properties.filter(({type}) =>  type === 'inversión')
    setFilteredList(filteredProperties)
  }, [properties]);
  
  return (
    <StyledProperty>
      {renderCards()}
    </StyledProperty>
  )
}

export default Property