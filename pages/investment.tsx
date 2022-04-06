import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { InvestmentCard } from '../components/layout'
import { Container } from '../components/ui'

type AdminProps = {
  properties: []
}

const StyledInvestment = styled(Container)`
  flex: 1;
  padding: 32px;
  .investment-cards-container {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 32px;
  }
`

const Investment = ({properties}: AdminProps) => {
  const [filteredList, setFilteredList] = useState<[]>([]);
  const renderCards = () => {
    return (
      <Container className='investment-cards-container'>
        {filteredList.map((data:any) => <InvestmentCard key={`${data.id}`} {...data}/>)}
      </Container>
    )
  }

  useEffect(() => {
    const filteredProperties:any = properties.filter(({type}) =>  type === 'inversión')
    setFilteredList(filteredProperties)
  }, [properties]);
  
  return (
    <StyledInvestment>
      {renderCards()}
    </StyledInvestment>
  )
}

export default Investment