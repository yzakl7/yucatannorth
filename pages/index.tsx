import { useEffect, useState } from "react"
import { Container } from "../components/ui";

type AdminProps = {
  properties: []
}

const Home = ({properties}: AdminProps) => {
  const [filteredList, setFilteredList] = useState<[]>([]);
  
  const searchProperty = (propertyArray: Record<string, string>[]) => {
    console.log({propertyArray});
    setFilteredList((propertyArray as []))
  }

  useEffect(() => {
    setFilteredList(properties)
  }, [properties]);
  

  return (
    <Container>
      index
    </Container>
  )
}

export default Home