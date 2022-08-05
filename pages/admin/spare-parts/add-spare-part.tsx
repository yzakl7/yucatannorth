import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Button, TextInput } from '../../../components/inputs'
import { Filters } from '../../../components/layout'
import { Container, Text } from '../../../components/ui'
import { hooks, sparePartsOperations } from '../../../state'
import { getColor } from '../../../utils/theme'

const StyledAddSparePart = styled(Container)`
  flex: 1;
  .title {
    align-items: center;
    padding: 16px;
    flex-direction: row;
    justify-content: space-between;
  }
  .body {
    align-items: flex-start;
    flex-direction: row;
    flex: 1;
    gap: 32px;
    max-width: 1024px;
    padding: 16px;
    .left-container {
      flex: 1;
      max-width: 350px;
      .text-input {
        background: ${getColor('secondary')};
        padding: 8px;
        input {
        }
      }
    }
    .right-container {
      flex-direction: row;
      gap: 16px;
      flex: 1; 
      align-items: flex-start;
      flex-wrap: wrap;
      .select-container {
        flex: 1;
        max-width: 350px;
        min-width: 200px;
      }
    }
  }
`



export const AddSparePart = () => {
  const { useAppDispatch } = hooks
  const { createSparePartItem } = sparePartsOperations
  const [ name, setName ] = useState('')
  const [ similars, setSimilars ] = useState('')
  const [ imageUrl, setImageUrl ] = useState('')
  const [ sku, setSku ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ filters, setFilters ] = useState({})
  const [years, setYears] = useState([])
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const onUpdateSparePart = () => {
    const splitList = name.toLowerCase().split(' ')
      const indexedKeywords = []
      for (let i = 0; i < splitList.length; i++) {
        for (let j = 0; j < splitList[i].length; j++) {
          indexedKeywords.push(splitList[i].substring(0, j + 1))
        }
      }
    const sparePartDetails = {
      name,
      sku,
      description,
      years,
      similars,
      indexedKeywords,
      imageUrl,
      ...filters
    }


    const callback = () => push('./')
    dispatch(createSparePartItem({params: { ...sparePartDetails }, callback}))
  }
  
  return (
    <StyledAddSparePart>
      <Container className='title'> 
        <Text textType='h3'>
          Editar refacción
        </Text>
        <Container direction='row'>
          <Button buttonStyle='primaryReverse' action={onUpdateSparePart}>
            <Text textType='p'>
              Guardar
            </Text>
          </Button>
        </Container>
      </Container>
      <Container className='body'>
        <Container className='left-container'>
          <Container className='text-input'>
            <Text textType='p'>Nombre</Text>
            <TextInput value={name} onChange={({target: { value }}) => setName(value)} />
          </Container>
          <Container className='text-input'>
            <Text textType='p'>Clave del producto</Text>
            <TextInput placeholder='Dejar vacío para generacion automática' value={sku} onChange={({target: { value }}) => setSku(value)} />
          </Container>
          <Container className='text-input'>
            <Text textType='p'>ImageURL</Text>
            <TextInput value={imageUrl} onChange={({target: { value }}) => setImageUrl(value)} />
          </Container>
          <Container className='text-input'>
            <Text textType='p'>Descripción</Text>
            <TextInput multiline='15' value={description} onChange={(value) => setDescription(`${value}`)} />
          </Container>
          <Container className='text-input'>
            <Text textType='p'>Similares</Text>
            <TextInput multiline='15' value={similars} onChange={(value) => setSimilars(`${value}`)} />
          </Container>
        </Container>
        <Container className='right-container'>
          <Filters value={filters} onChange={setFilters} />
        </Container>
      </Container>
    </StyledAddSparePart>
  )
}

export default AddSparePart
