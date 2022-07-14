import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Select, TextInput } from '../../../components/inputs'
import { Container, Text } from '../../../components/ui'
import { hooks, sparePartsOperations, sparePartsSelectors } from '../../../state'
import { getColor } from '../../../utils/theme'

const StyledAddSparePart = styled(Container)`
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

const filterValues = [
  { label: 'CATEGORÍA', key:'category', options: ["N/A", "ARTICULOS DE AFINACION"]},
  { label: 'FAMILIA', key:'family', options: ["N/A", "FILTRO DE ACEITE"]},
  { label: 'MARCA DE AUTO', key:'brand', options: ["N/A", "AUDI"]},
  { label: 'CILINDROS', key:'cilinders', options: ["N/A", "V6"]},
  { label: 'LTS', key:'lts', options: ["N/A", "(2.8)"]},
  { label: 'CM', key:'cm', options: ["N/A"]},
  { label: 'PU', key:'pu', options: ["N/A"]},
  { label: 'MOTOR', key:'motor', options: ["N/A"]},
  { label: 'VÁLVULAS', key:'valves', options: ["N/A"]},
  { label: 'MODELO', key:'models', options: ["N/A", '100']},
  { label: 'ESPECIFICACIÓNES', key:'specifications', options: ["N/A"]},
  { label: 'LINEA', key:'line', options: ["N/A", "FA"]},
  { label: 'MARCA DE PRODUCTO', key:'productBrand', options: ["N/A", "PART MASTER"]},
]


export const AddSparePart = () => {
  const { useAppDispatch, useAppSelector } = hooks
  const { updateSparePartItem, getSparePartItem } = sparePartsOperations
  const { selectSpareParts } = sparePartsSelectors
  const [ name, setName ] = useState('')
  const [ similars, setSimilars ] = useState('')
  const [ sku, setSku ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ filters, setFilters ] = useState<Record<string, string>>()
  const { sparePartItem } = useAppSelector(selectSpareParts)

  const [years, setYears] = useState([])
  const { push, query: { sparePartId: id } } = useRouter()
  
  const dispatch = useAppDispatch()

  const onUpdateSparePart = () => {
    const sparePartDetails = {
      id,
      name,
      sku,
      description,
      filters,
      years,
      similars,
    }
    const callback = () => push('./')
    dispatch(updateSparePartItem({params: sparePartDetails, callback}))
  }
  useEffect(() => {
    if (sparePartItem) {
      setName(sparePartItem.name)
      setSku(sparePartItem.sku || sparePartItem.id)
      setDescription(sparePartItem.description)
      setFilters(sparePartItem.filters)
      setYears(sparePartItem.years)
      setSimilars(sparePartItem.similars)
    }
    console.log({sparePartItem});

  }, [sparePartItem])

  useEffect(() => {
    dispatch(getSparePartItem({id}))
  }, [])
  
  return (
    <StyledAddSparePart>
      <Container className='title'> 
        <Text textType='h3'>
          Editar refacción
        </Text>
        <Container direction='row'>
          <Button buttonStyle='primaryReverse' action={() => push('./')}>
            <Text textType='p'>
              Ver lsta de refacciónes
            </Text>
          </Button>
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
            <TextInput value={name} onChange={(e) => setName(e.value)} />
          </Container>
          <Container className='text-input'>
            <Text textType='p'>Clave del producto</Text>
            <TextInput placeholder='Dejar vacío para generacion automática' value={sku} onChange={(e) => setSku(e.value)} />
          </Container>
          <Container className='text-input'>
            <Text textType='p'>Descripción</Text>
            <TextInput multiline='15' value={description} onChange={(e) => setDescription(e.value)} />
          </Container>
          <Container className='text-input'>
            <Text textType='p'>Similares</Text>
            <TextInput multiline='15' value={similars} onChange={(e) => setSimilars(e.value)} />
          </Container>
        </Container>
        <Container className='right-container'>
          {
            filterValues?.map(({key, label, options}:any) => {
              console.log({filters});
              return (
                <Container key={key} className='select-container'>
                  <Text textType='p'>{label}</Text>
                  <Select
                    value={filters && (filters as any)[key]}
                    options={options.map((value:any) => ({value, name: value}))}
                    onChange={(value) => {
                      console.log({options, value, key})
                      setFilters({ ...filters, [key]: value })
                    }}
                  />
                </Container>
              )}
            )
          }
          
        </Container>
      </Container>
    </StyledAddSparePart>
  )
}

export default AddSparePart
