// import { PropertyBrowser } from "../components/properties/property-browser"
// import { PropertyList } from "../components/properties/property-list"
// import { Card } from "../components/UI/style/card"
import Container from "../components/UI/style/container"

type AdminProps = {
  properties: []
}
const Home = ({properties}: AdminProps) => {
  return (
    <Container>
      {/* <PropertyBrowser data={properties} /> */}
    </Container>
  )
}

export default Home
