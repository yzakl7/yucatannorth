import styled from "@emotion/styled";
import { useEffect, useState } from "react"
import { PropertyCard } from "../components/layout";
import { Container } from "../components/ui";

type AdminProps = {
  properties: []
}

const StyledHome = styled(Container)`
  padding: 32px;
  .property-cards-container {
    gap: 32px;
  }
`

const Home = ({ properties }: AdminProps) => {
  const [filteredList, setFilteredList] = useState<[]>([]);

  const renderPropertyCards = () => {
    return (
      <Container className="property-cards-container" >
        { filteredList.map((data:any) => <PropertyCard key={Math.random()} data={data} />) }
      </Container>
    )
  }

  useEffect(() => {
    const filteredProperties:any = properties.filter(({type}) =>  type !== 'inversión')
    setFilteredList(filteredProperties)
  }, [properties]);
  
  return (
    <StyledHome>
      {renderPropertyCards()}
    </StyledHome>
  )
}

export default Home