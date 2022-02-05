import { useEffect, useState } from "react"
import { PropertyBrowser } from "../components/properties/property-browser"
import { PropertyList } from "../components/properties/property-list"
import { Card } from "../components/UI/style/card"
import Container from "../components/UI/style/container"
import { SearchBar } from "../components/UI/style/search-bar"
import Property from "./properties/edit/[id]"

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
      <SearchBar array={properties} searchIn="name" callback={(x) => searchProperty(x)}/>
      <Container direction="row" wrap="wrap" gap="0px">
        <Filters />
        <PropertyBrowser data={filteredList} />
      </Container>
    </Container>
  )
}

export default Home

import styled from "@emotion/styled"
import Form, { CommonProps } from "../components/UI/form/form"

const StyledFilters = styled(Container)`
  max-width: 250px;
  gap: 0;
  .form-container {
    position: sticky;
    top: 80px;
    padding: 16px;
    background: white;
  }
  margin: 16px;
  .expand-button {
    display: none;
  }
  @media(max-width: 768px) {
    max-width: unset;
    margin-top: 0;
    width: 100%;
    position: sticky;
    top: 60px;
    z-index: 6;
    padding: 0;
    .form-container {
      padding: 0px;
      height: 0;
      &.is-open {
        height: unset;
        max-height: calc(100vh - 250px);
        padding: 16px;
      }
    }
    overflow: hidden;
    .expand-button {
      background: white;
      display: flex;
      padding: 16px;
    }
  }
`

const filtersData: CommonProps[] = [
  {
    type: 'select',
    name: 'location',
    flex: 'unset',
    placeholder: 'Categoría',
    options: ['norte-poniente', 'norte-oriente']
  },
  {
    type: 'select',
    name: 'property_type',
    flex: 'unset',
    placeholder: 'Tipo de cambio',
    options: ['casa', 'terreno', 'lote premium', 'departamento', 'townhouse']
  },
  {
    name: 'bathroomsgroup',
    type: 'inputGroup',
    flex: '2',
    wrap: true,
    array: [
      {
        type: 'title',
        label: 'Baños'
      },
      {
        type: 'textInput',
        name: 'bathrooms',
        value: 2,
        placeholder: 'Baños',
      },
    ]
  },
  {
    name: 'slothsgrout',
    type: 'inputGroup',
    flex: '2',
    wrap: true,
    array: [
      {
        type: 'title',
        label: 'Cajones de estacionamiento'
      },
      {
        type: 'textInput',
        name: 'sloths',
        value: 1,
      },
    ]
  },
  {
    name: 'roomsgroup',
    type: 'inputGroup',
    flex: '2',
    wrap: true,
    array: [
      {
        type: 'title',
        label: 'Cuartos'
      },
      {
        type: 'textInput',
        name: 'bathrooroomsms',
        value: 4,
      },
    ]
  },
  {
    name: 'floorsgroup',
    type: 'inputGroup',
    flex: '2',
    wrap: true,
    array: [
      {
        type: 'title',
        label: 'Pisos'
      },
      {
        type: 'textInput',
        name: 'floors',
        value: 2,
      },
    ]
  },

]

const Filters = () => {
  const [expanded, setExpanded] = useState(false);
  return <StyledFilters>
    <Container className="expand-button" onClick={() => setExpanded(!expanded)}>filtros</Container>
    <Container className={`form-container${expanded ? ' is-open' : ''}`} >
      Precio mínimo
      <input type="range"></input>
      Precio máximo
      <input type="range"></input>
      <Form data={filtersData} onChange={console.log}/>
    </Container>
  </StyledFilters>
}