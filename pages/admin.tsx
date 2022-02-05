import React, { ReactDOM, ReactNode, useState } from 'react'
import Container from '../components/UI/style/container'
import { PropertyList } from '../components/properties/property-list'
import IconButton from '../components/UI/buttons/icon-button'
import { AiOutlineFileAdd } from 'react-icons/ai'
import styled from '@emotion/styled'
import { createNewProperty } from '../components/api/firebaseAPI'
import { useRouter } from 'next/router'
import { Text } from '../components/UI/style/text'
import { PropertyCreateModal } from '../components/properties/property-create-modal'
import Form from '../components/UI/form/form'

const StyledAdmin = styled(Container)`
  flex: 1;
  .buttons-container {
    svg {
      font-size: 32px;
    }
  }
`

type AdminProps = {
  properties: [],
  callModal: (component:ReactNode) => void,
  dismissModal: () => void,
}

const onCreateNewProperty = async (params:any, callback: (x:string) => void) => {
  try {
    const id = await createNewProperty(params)
    callback(`/properties/edit/${id}`)
  } catch(error) {
    throw({error});
  }
}

const Admin = (props: AdminProps) => {
  const { push } = useRouter()
  const [newPropertyParams, setnewPropertyParams] = useState({})
  const { callModal, dismissModal, properties } = props

  const onChange = console.log
  const renderModal = () => {
    const formData = [
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
        placeholder: 'Tipo de propiedad',
        options: ['casa', 'terreno', 'lote premium', 'departamento', 'townhouse']
        },
    ]
      return (
        <PropertyCreateModal dismissModal={dismissModal} dismissCallback={() => onCreateNewProperty(newPropertyParams, push)} >
          <Form data={formData} onChange={(formData) => setnewPropertyParams({...formData.values})} />

        </PropertyCreateModal>
      )
    }
    const location1 = properties.filter((property:any) => property.location === 'norte-poniente')
    const location2 = properties.filter((property:any) => property.location === 'norte-oriente')
  return (
    <StyledAdmin>
      <Container className="buttons-container">
        <IconButton height="50px" width="50px" onClick={() => callModal(renderModal())}>
          <AiOutlineFileAdd />
        </IconButton>
      </Container>
      <Container direction='row' wrap='wrap'>
        { location1.length > 0 && <Container flex="1">
          <Text textType='h4'>Norte Poniente</Text>
          <PropertyList data={location1} />
        </Container>}
        { location2.length > 0 && <Container flex="1">
          <Text textType='h4'>Norte Oriente</Text>
          <PropertyList data={location2} />
        </Container>}
      </Container>
    </StyledAdmin>
  )
}

export default Admin