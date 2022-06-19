import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Button, CheckBox, Select, TextInput } from '../../../components/inputs'
import { Container, Text } from '../../../components/ui'
import { hooks, sparePartsOperations } from '../../../state'
import { getColor } from '../../../utils/theme'

const StyledAddSparePart = styled(Container)`
  .title {
    align-items: center;
    padding: 16px;
    flex-direction: row;
    justify-content: space-between;
  }
  .body {
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

const categoryList = ["N/A", "ARTICULOS DE AFINACION"]
const familyList = ["N/A", "FILTRO DE ACEITE"]
const brandList = ["N/A", "AUDI"]
const cilindersList = ["N/A", "V6"]
const ltsList = ["N/A", "(2.8)"]
const cmList = ["N/A"]
const puList = ["N/A"]
const motorList = ["N/A"]
const valvesList = ["N/A"]
const modelsList = ["N/A", '100']
const specificationsList = ["N/A"]
const lineList = ["N/A", "FA"]
const productBrandList = ["N/A", "PART MASTER"]

export const AddSparePart = () => {
  const { useAppDispatch } = hooks
  const { createSparePartItem } = sparePartsOperations
  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(categoryList[0])
  const [family, setFamily] = useState(familyList[0])
  const [brand, setBrand] = useState(brandList[0])
  const [cilinders, setCilinders] = useState(cilindersList[0])
  const [lts, setLts] = useState(ltsList[0])
  const [cm, setCm] = useState(cmList[0])
  const [pu, setPu] = useState(puList[0])
  const [motor, setMotor] = useState(motorList[0])
  const [valves, setValves] = useState(valvesList[0])
  const [models, setModels] = useState(modelsList[0])
  const [specifications, setSpecifications] = useState(specificationsList[0])
  const [line, setLine] = useState(lineList[0])
  const [productBrand, setProductBrand] = useState(productBrandList[0])
  const [years, setYears] = useState([])
  const [disabled, setDisabled] = useState(false)
  const { push } = useRouter()
  const dispatch = useAppDispatch()

  const onCreateSparePart = () => {
    const sparePartDetails = {
      name,
      sku,
      description,
      category,
      family,
      brand,
      cilinders,
      lts,
      cm,
      pu,
      motor,
      valves,
      models,
      specifications,
      line,
      productBrand,
      years,
      disabled
    }
    const callback = () => push('./')
    dispatch(createSparePartItem({params: sparePartDetails, callback}))
  }

  return (
    <StyledAddSparePart>
      <Container className='title'> 
        <Text textType='h3'>
          Nueva refacción
        </Text>
        <Container direction='row'>
          <Button buttonStyle='primaryReverse' action={() => push('./')}>
            <Text textType='p'>
              Regresar a lista de refacciónes
            </Text>
          </Button>
          <Button buttonStyle='primaryReverse' action={onCreateSparePart}>
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
            <Text textType='p'>Resumen</Text>
            <TextInput multiline='5' value={description} onChange={(e) => setDescription(e.value)} />
          </Container>
          <Container className='select-container'>
            <CheckBox value={!disabled} onChange={(value) => setDisabled(!value)} >Activo</CheckBox>
          </Container>
        </Container>
        <Container className='right-container'>
          <Container className='select-container'>
            <Text textType='p'>Categoría</Text>
            <Select value={category} options={categoryList.map((value) => ({name:value, value}))} onChange={(param) => setCategory(param)}/>
          </Container>
          <Container className='select-container'>
            <Text textType='p'>Familia</Text>
            <Select value={family} options={familyList.map((value) => ({name:value, value}))} onChange={(param) => setFamily(param)}/>
          </Container>
          <Container className='select-container'>
            <Text textType='p'>Marca</Text>
            <Select value={brand} options={brandList.map((value) => ({name:value, value}))} onChange={(param) => setBrand(param)}/>
          </Container>
          <Container className='select-container'>
            <Text textType='p'>Cilindros</Text>
            <Select value={cilinders} options={cilindersList.map((value) => ({name:value, value}))} onChange={(param) => setCilinders(param)}/>
          </Container> 
          <Container className='select-container'>
            <Text textType='p'>LTS</Text>
            <Select value={lts} options={ltsList.map((value) => ({name:value, value}))} onChange={(param) => setLts(param)}/>
          </Container> 
          <Container className='select-container'>
            <Text textType='p'>CM</Text>
            <Select value={cm} options={cmList.map((value) => ({name:value, value}))} onChange={(param) => setCm(param)}/>
          </Container> 
          <Container className='select-container'>
            <Text textType='p'>PU</Text>
            <Select value={pu} options={puList.map((value) => ({name:value, value}))} onChange={(param) => setPu(param)}/>
          </Container> 
          <Container className='select-container'>
            <Text textType='p'>MOTOR</Text>
            <Select value={motor} options={motorList.map((value) => ({name:value, value}))} onChange={(param) => setMotor(param)}/>
          </Container> 
          <Container className='select-container'>
            <Text textType='p'>VALVULAS</Text>
            <Select value={valves} options={valvesList.map((value) => ({name:value, value}))} onChange={(param) => setValves(param)}/>
          </Container>
          <Container className='select-container'>
            <Text textType='p'>MODELO</Text>
            <Select value={models} options={modelsList.map((value) => ({name:value, value}))} onChange={(param) => setModels(param)}/>
          </Container>
          <Container className='select-container'>
            <Text textType='p'>ESPECIFICACIONES</Text>
            <Select value={specifications} options={specificationsList.map((value) => ({name:value, value}))} onChange={(param) => setSpecifications(param)}/>
          </Container> 
          <Container className='select-container'>
            <Text textType='p'>LINEA</Text>
            <Select value={line} options={lineList.map((value) => ({name:value, value}))} onChange={(param) => setLine(param)}/>
          </Container>
          <Container className='select-container'>
            <Text textType='p'>MARCA DE PRODUCTO</Text>
            <Select value={productBrand} options={productBrandList.map((value) => ({name:value, value}))} onChange={(param) => setProductBrand(param)}/>
          </Container> 
        </Container>
      </Container>
    </StyledAddSparePart>
  )
}

export default AddSparePart
