import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { ReactNode, useContext, useEffect, useState } from 'react'
import { LangContext } from '../../../utils/lang/langContext'
import { deleteImage, deletePDF, deleteProperty, getPropertyData, updatePropertyData, uploadImage, uploadPDF } from '../../../components/api/firebaseAPI'
import { AiOutlineDelete } from 'react-icons/ai'
import { Container, Form, Text } from '../../../components/ui'
import { Button, IconButton } from '../../../components/inputs'
import { getColor } from '../../../utils/theme'

export type TagType = {
  name: string
  value: string
  icon: ReactNode
}

type FormElementType = 'inputGroup' 
  | 'textInput'
  | 'select'
  | 'checkBox'
  | 'switch'
  | 'title'
  | 'numberInput'

export type CommonProps = {
  name?: string
  direction?: string
  type?: FormElementType
  value?: string
  wrap?: boolean
  array?: CommonProps[]
  options?: string[]
  range?: number[]
  minWidth?: string
  isPassword?: boolean
  placeholder?: string
  validation?: 'isEmail' | ((value?: string | undefined) => { isValid: boolean; text: string; type: string; })
  months?: boolean
  flex?: string
  label?: string
  tooltip?: string
  multiline?: string
}

const StyledProperty = styled(Container)`
  padding: 32px;
  gap: 32px;
`

const Property = (props:any) => {
  const { properties, getStnapshot, dismissModal } = props
  const [state, setState] = useState<any>({})
  const {query: { id }} = useRouter() || ''
  const [isLoading, setisLoading] = useState(true)
  const [PDFFetching, setPDFFetching] = useState(false)
  const [imageFetching, setImageFetching] = useState(false)
  const { push } = useRouter()

  const propertyImages = state.images?.map(({name, imgUrl}: Record<string, string>) => ({
    name,
    src: imgUrl,
    alt: name
  }))

  const formData:any = [
    {
      type: 'title',
      label: 'Detalle',
    },
    {
      minWidth: '200px',
      type: 'textInput',
      name: 'name',
      flex: "1",
      value: state.name,
      placeholder: 'Nombre',
      label: 'Nombre',
    },
    {
      name: 'locationGroup',
      type: 'inputGroup',
      wrap: true,
      array: [
        {
          type: 'select',
          name: 'category',
          flex: "1",
          value: state.category,
          placeholder: 'Tipo de cambio',
          label: 'Categoría',
          options: [
            {name: 'casa', value: 'casa'},
            {name: 'terreno', value: 'terreno'},
            {name: 'lote premium', value: 'lote premium'},
            {name: 'departamento', value: 'departamento'},
            {name: 'oficina', value: 'office'},
            {name: 'consultorio', value: 'consulting_room'},
            {name: 'townhouse', value: 'townhouse'}
          ]
        },
        {
          type: 'select',
          name: 'group',
          flex: '1',
          value: state.group,
          placeholder: 'Grupo',
          label: 'Grupo',
          options: [
            {name: 'norte-poniente', Value: 'norte-poniente'},
            {name: 'norte-oriente', Value: 'norte-oriente'}
          ]
        },
        {
          type: 'select',
          name: 'area',
          flex: '1',
          value: state.area,
          placeholder: 'Área',
          label: 'Área',
          options: [
            {name: 'playa', value: 'playa'},
            {name: 'ciudad', value: 'ciudad'}
          ]
        },
        {
          type: 'select',
          name: 'type',
          flex: '1',
          value: state.type,
          placeholder: 'Tipo',
          label: 'Tipo',
          options: [
            {name: 'inversión', value: 'inversión'},
            {name: 'propiedad', value: 'propiedad'}
          ]
        },
      ]
    },
    {
      type: 'title',
      label: 'Ubicación',
    },
    {
      name: 'addressGroup',
      type: 'inputGroup',
      flex: '2',
      wrap: true,
      array: [
        {
          type: 'textInput',
          name: 'line_1',
          value: state.line_1,
          minWidth: '350px',
          flex: "2",
          placeholder: 'Dirección',
          label: 'Dirección',
        },
        {
          type: 'textInput',
          name: 'suburb',
          value: state.suburb,
          minWidth: '350px',
          flex: "1",
          placeholder: 'Colonia',
          label: 'Colonia',
        },
      ]
    },
    {
      type: 'textInput',
      name: 'mapSrc',
      value: state.mapSrc,
      minWidth: '350px',
      flex: "2",
      placeholder: 'URL de mapa',
      label: 'URL de mapa',
    },
    {
      type: 'title',
      label: 'Descripción',
    },
    {
      name: 'shortDescriptionInputGroup',
      type: 'inputGroup',
      wrap: true,
      array: [
        {
          placeholder: 'Descripción corta',
          label: 'Descripción corta',
          type: 'textInput',
          minWidth: '350px',
          name: 'short_description',
          value: state.short_description,
          multiline: '5',
        }
      ]
    },
    {
      name: 'descriptionInputGroup',
      type: 'inputGroup',
      wrap: true,
      array: [
        {
          placeholder: 'Descripción',
          label: 'Descripción',
          type: 'textInput',
          minWidth: '350px',
          name: 'description',
          value: state.description,
          multiline: '10',
        }
      ]
    },
    {
      name: 'featuresMeasuresAndPricingInputGroup',
      type: 'inputGroup',
      direction: 'row',
      wrap: true,
      array: [
        {
          name: 'featuresAndMeasuresInputGroup',
          title: 'Características',
          type: 'inputGroup',
          direction: 'row',
          flex: "2",
          wrap: true,
          array: [
            {
              name: 'featuresInputGroup',
              type: 'inputGroup',
              direction: 'column',
              flex: "1",
              array: [
                {
                  type: 'numberInput',
                  name: 'rooms',
                  value: state.rooms,
                  placeholder: 'Recámaras',
                  label: 'Recámaras',
                },
                {
                  type: 'numberInput',
                  name: 'floors',
                  value: state.floors,
                  placeholder: 'Pisos',
                  label: 'Pisos',
                },
                {
                  type: 'numberInput',
                  name: 'bathrooms',
                  value: state.bathrooms,
                  placeholder: 'Baños',
                  label: 'Baños',
                },
                {
                  type: 'numberInput',
                  value: state.car_slots,
                  name: 'car_slots',
                  placeholder: 'Cajones de estacinamiento',
                  label: 'Cajones de estacinamiento',
                },
              ]
            },
            {
              name: 'measuresInputGroup',
              direction: 'column',
              flex: '1',
              type: 'inputGroup',
              array: [
                {
                  type: 'numberInput',
                  value: state.land_area,
                  name: 'land_area',
                  flex: "1",
                  placeholder: 'Terreno',
                  label: 'Terreno',
                },
                {
                  type: 'numberInput',
                  value: state.built_area,
                  name: 'built_area',
                  flex: "1",
                  placeholder: 'Construcción',
                  label: 'Construcción',
                },
                {
                  type: 'numberInput',
                  value: state.front,
                  name: 'front',
                  flex: "1",
                  placeholder: 'Frente',
                  label: 'Frente',
                },
                {
                  type: 'numberInput',
                  name: 'bottom',
                  value: state.bottom,
                  flex: "1",
                  placeholder: 'Fondo',
                  label: 'Fondo',
                },
                {
                  type: 'numberInput',
                  value: state.left,
                  name: 'left',
                  flex: "1",
                  placeholder: 'Izquierda',
                  label: 'Izquierda',
                },
                {
                  type: 'numberInput',
                  value: state.right,
                  name: 'right',
                  flex: "1",
                  placeholder: 'Derecha',
                  label: 'Derecha',
                },
              ]
            },
          ]
        },
        {
          name: 'pricingInputGroup',
          direction: 'column',
          type: 'inputGroup',
          flex: '1',
          title: 'Precio',
          wrap: true,
          array: [       
            {
              type: 'select',
              name: 'currency',
              flex: '1',
              value: state.currency,
              placeholder: 'Tipo de cambio',
              label: 'Tipo de cambio',
              options: [
                {name:'mxn', value:'mxn'},
                {name:'usd', value:'usd'},
              ]
            },
            {
              type: 'numberInput',
              minWidth: '180px',
              value: state.price,
              name: 'price',
              flex: "1",
              placeholder: 'Precio',           
              label: 'Precio',
            },  
          ]
        },
      ]
    },
  ]

  const onChange = (params: { values: Record<string, string>; hasErrors: boolean; }) => {
    setState({...state, ...params.values})
  }

  const onSave = async () => {
    const getMapSrc = (html:string) => {
      let extractedMapSrc = html
      if (!html) {
        return state.address?.mapSrc || ''
      }

      html.split(' ').forEach((el:string) => {
        const htmlArrayElementProps = el.replace("'", '').replace("></iframe>", '').replace("<iframe", '')
        const splitHtmlArrayElementProps = htmlArrayElementProps.split("=\"")
        if (splitHtmlArrayElementProps[0] === "src") {
          extractedMapSrc = splitHtmlArrayElementProps[1].replace("\"", '')
        }
      })

      return extractedMapSrc
    }

    try {
      const upload = {...state}
      upload.measures = {}
      upload.features = {}
      upload.address = {}
      
      if (state.bottom) {
        upload.measures.bottom = state.bottom;
      }
      if (state.land_area) {
        upload.measures.land_area = state.land_area;
      }
      if (state.built_area) {
        upload.measures.built_area = state.built_area;
      }
      if (state.right) {
        upload.measures.right = state.right;
      }
      if (state.front) {
        upload.measures.front = state.front;
      }
      if (state.left) {
        upload.measures.left = state.left;
      }
      if (state.car_slots) {
        upload.features.car_slots = state.car_slots;
      }
      if (state.floors) {
        upload.features.floors = state.floors;
      }
      if (state.rooms) {
        upload.features.rooms = state.rooms;
      }
      if (state.mapSrc) {
        upload.address.mapSrc = getMapSrc(state.mapSrc);
      }
      if (state.suburb) {
        upload.address.suburb = state.suburb;
      }
      if (state.line_1) {
        upload.address.line_1 = state.line_1;
      }
      if (state.description) {
        upload.description = state.description;
      }
      if (!state.type) {
        upload.type = 'inversión';
      }
      if (state.short_description) {
        upload.short_description = state.short_description;
      }

      await updatePropertyData({ id:`${id}`, data: upload })
      await getStnapshot()
      push('/admin')

    } catch(error) {
      console.error(error)
    }
  }

  const onDelete =  async ( )=> {
    try {
      await deleteProperty(`${id}`)
      await getStnapshot()
      push('/admin')
      dismissModal()
    } catch(error) {
      console.error(error)
    }
  }

  const uploadPDFFile = (e:any) => {
    setPDFFetching(true)
    const fileList = e.target.files
    const doUpload = async (id:string, name:string, file:any) => {
      try {
        const response = await uploadPDF(id, name, file)
        await getStnapshot()
        return response
      } catch (err) {
        throw err
      } finally {
        setPDFFetching(false)
      }

    }

    for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
      const file = fileList[i];
      doUpload(`${id}`, file.name, file)
    }

  }

  const uploadFile = (e:any) => {
    setImageFetching(true)
    const fileList = e.target.files
    const fileArray = []
    const doUpload = async (id:string, name:string, file:any) => {
      try {
        const response = await uploadImage(id, name, file)
        await getStnapshot()
        return response
      } catch (err) {
        throw err
      } finally {
        setImageFetching(false)
      }

    }

    for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
      const file = fileList[i];
      doUpload(`${id}`, file.name, file)
    }
  }

  const onDeletePDF = async (imageName:string) => {
    setImageFetching(true)
    try {
      const res = await deletePDF(`${id}`, imageName)
      await getStnapshot()
      return res
    } catch(err) {
      throw(err)
    } finally {
      setImageFetching(false)
    }
  }
  
  const onDeleteImage = async (imageName:string) => {
    setImageFetching(true)
    try {
      const res = await deleteImage(`${id}`, imageName)
      await getStnapshot()
      return res
    } catch(err) {
      throw(err)
    } finally {
      setImageFetching(false)
    }
  }

  useEffect(() => {
    setisLoading(false)
  }, [id]) 

  useEffect(() => {
    const property = properties.find(({id:propertyId}:any) => propertyId === id )
    if (property) {
      const newProperty = {... property}
      delete newProperty.description
      delete newProperty.shortDescription
      delete newProperty.features
      delete newProperty.address
      delete newProperty.measures

      if (property.address) {
        newProperty.line_1 = `${property.address.line_1 || '' }`
        newProperty.suburb = `${property.address.suburb || '' }`
        newProperty.mapSrc = `${property.address.mapSrc || '' }`
      }

      if (property.measures) {
        newProperty.bottom = `${property.measures.bottom || '' }`
        newProperty.built_area = `${property.measures.built_area || '' }`
        newProperty.front = `${property.measures.front || '' }`
        newProperty.land_area = `${property.measures.land_area || '' }`
        newProperty.left = `${property.measures.left || '' }`
        newProperty.right = `${property.measures.right || '' }`
      }

      if (property.features) {
        newProperty.car_slots = `${property.features.car_slots || '' }`
        newProperty.bathrooms = `${property.features.bathrooms || '' }`
        newProperty.floors = `${property.features.floors || '' }`
        newProperty.rooms = `${property.features.rooms || '' }`
      }
      
      if (property.description) {
        newProperty.description = `${property.description || '' }`
      }

      if (property.shortDescription) {
        newProperty.short_description = `${property.shortDescription || '' }`
      }
      setState(newProperty)
    }
  }, [properties])

  useEffect(() => {
  }, [state])
  

  if (isLoading) {
    return <div>Loading...</div>
  }

  

  return ( 
    <StyledProperty>
      <Text textType="h3">Editar propiedad</Text>
      <Container>
        <input type="file" accept="image/png, image/gif, image/jpeg"  onChange={uploadFile} multiple></input>
        <Container direction='row'>
          {
            propertyImages?.map(({src, name}:any) => {
              return (
                <Container key={src} className='thumbnail'>
                  <img alt="" width="50px" height="50px" src={src}></img>
                  <Container className='image-preview' justify='flex-end'>
                    <Container onClick={() => onDeleteImage(name)} className='delete-button' align='center'>
                      <IconButton>
                        <AiOutlineDelete />
                      </IconButton>
                      Eliminar
                    </Container>
                    {/* <img alt="" src={src}></img> */}
                  </Container>
                </Container>
              )
            })
          }
          {
            imageFetching && 'Loading'
          }
        </Container>
      </Container>
      <Form data={formData} onChange={onChange} />
        {state.type === "inversión" && (
          <>
            { state.pdf && (<Container direction={'row'} align='center'>
              <Text textType='p'>{state.pdf.name}</Text>
              <Button action={() => onDeletePDF(state.pdf.name)}>
                <Text textType='p'>Eliminar</Text>
              </Button>
            </Container>) }
            <Container direction='row'>
              <Text textType='p'>{state.pdf?.name ? 'Cambiar PDF' : 'Agregar PDF'}</Text>
              <input type="file" accept="application/pdf" onChange={uploadPDFFile}></input>
              {PDFFetching ? 'subiendo pdf' : ''}
            </Container>
          </>
        )}

      <Container direction="row">
        <IconButton onClick={onDelete}>Eliminar propiedad</IconButton>
        <IconButton onClick={onSave}>Guardar</IconButton>
      </Container>
    </StyledProperty>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps({ params }:any) {
  try {
    const data = await getPropertyData(params)
    return {
      props: { data: { ...data, id:params.id } },
    }
  } catch(error) {
    return {
      redirect: {
        destination: "/",
      },
    }
  }
}

export default Property