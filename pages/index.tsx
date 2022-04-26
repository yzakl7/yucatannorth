import styled from "@emotion/styled";
import { useEffect, useState } from "react"
import { InvestmentCard } from "../components/layout";
import { Container } from "../components/ui";

type AdminProps = {
  properties: []
}

const StyledHome = styled(Container)`
  padding: 32px;
  .investment-cards-container {
    gap: 32px;
  }
`

const Home = ({ properties }: AdminProps) => {
  const [filteredList, setFilteredList] = useState<[]>([]);

  const renderInvestmentCards = () => {
    return (
      <Container className="investment-cards-container" >
        { filteredList.map((data:any) => <InvestmentCard key={data.id} {...data} />) }
      </Container>
    )
  }

  useEffect(() => {
    const filteredProperties:any = properties.filter(({type}) =>  type !== 'inversión')
    setFilteredList(filteredProperties)
  }, [properties]);
  
  return (
    <StyledHome>
      {renderInvestmentCards()}
    </StyledHome>
  )
}

export default Home