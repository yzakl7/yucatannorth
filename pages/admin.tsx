import React, { ReactDOM, ReactNode, useState } from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { v4 as uuid} from 'uuid';

import styled from '@emotion/styled'
import { createNewProperty } from '../components/api/firebaseAPI'
import { useRouter } from 'next/router'
import { Container, Form, Text } from '../components/ui'
import { IconButton } from '../components/inputs'
import { getColor } from '../utils/theme'

const StyledAdmin = styled(Container)`
  flex: 1;
  padding: 32px;
  .table-row {
    padding: 16px 0;
    border-bottom: 1px solid ${getColor('border')};
    align-items: center;
    &:hover {
      background: ${getColor('secondary')};
    }
  }
  span {
    background: ${getColor('primary')};
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${getColor('white')};
    border-radius: 5px;
  }
`

type AdminProps = {
  properties: [],
  callModal: (component:ReactNode) => void,
  dismissModal: () => void,
}
const Admin = ({properties}: AdminProps) => {
  const { push } = useRouter()

  const onCreateNewProperty = async (params:any, callback: (x:string) => void) => {
    try {
      const id = await createNewProperty(params)
      callback(`/properties/edit/${id}`)
    } catch(error) {
      throw({error});
    }
  }

  const onPropertySelect = (property?:{id: string}) => {
    push(`/properties/edit/${property ? property.id : uuid()}`)
  }

  const renderTable = () => {
    return properties.map((property)=> {
      const {
        name,
        id,
        type,
        category,
        group,
        area,
        price
      } = property
      return (
        <Container minWidth='100%' gap="0" onClick={() => onPropertySelect(property)} className='table-row' key={id} direction='row'>
          <Container flex="2">
            <Text textType='p'>{name}</Text>
          </Container>
          <Container align="center" flex="1">
            <Text textType='p'>{type}</Text>
          </Container>
          <Container align="center" flex="1">
            <Text textType='p'>{category}</Text>
          </Container>
          <Container align="center" flex="1">
            <Text textType='p'>{price}</Text>
          </Container>
          <Container align="center" flex="1">
            <Text textType='p'>{area}</Text>
            <Text textType='p'>{group}</Text>
          </Container>
        </Container>
      )
    })
  }

  const renderTableHeader = () => {
    return  (
      <Container minWidth='100%' direction='row'>
        <Container flex="2">
          <Text textType='span'>NOMBRE</Text>
        </Container>
        <Container flex="1">
          <Text textType='span'>TIPO</Text>
        </Container>
        <Container flex="1">
          <Text textType='span'>CATEGORÍA</Text>
        </Container>
        <Container flex="1">
          <Text textType='span'>PRECIO</Text>
        </Container>
        <Container flex="1">
          <Text textType='span'>UBICACIÓN</Text>
        </Container>
      </Container>
    )
  }


  return (
    <StyledAdmin align="flex-start">
      <IconButton onClick={() => onPropertySelect(undefined)}>Nueva propiedad</IconButton>
      {renderTableHeader()}
      {renderTable()}
    </StyledAdmin>
  )
}

export default Admin