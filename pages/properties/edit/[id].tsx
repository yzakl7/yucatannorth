import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { ReactNode, useContext, useEffect, useState } from 'react'
import { LangContext } from '../../../utils/lang/langContext'
import { deleteImage, deleteProperty, getPropertyData, updatePropertyData, uploadImage } from '../../../components/api/firebaseAPI'
import { AiOutlineDelete } from 'react-icons/ai'
import { Container, Form, Text } from '../../../components/ui'
import { IconButton } from '../../../components/inputs'
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
  console.log({props});
  const { properties, getStnapshot, dismissModal } = props
  const [state, setState] = useState<Record<string, string>>({})
  const {query: { id }} = useRouter() || ''
  const data = properties.find(({id: findId}:Record<string, string>) => findId === id ) || ''
  const [isLoading, setisLoading] = useState(true)
  const [imageFetching, setImageFetching] = useState(false)
  const { pathname, push } = useRouter()
  const {
    isFeatured,
    features,
    description,
    shortDescription,
    address,
    name,
    measures,
    currency,
    property_type,
    price,
    group,
    images,
    area,
    type,
    category
  } = data

  const propertyImages = images?.map(({name, imgUrl}: Record<string, string>) => ({
    name,
    src: imgUrl,
    alt: name
  }))

  const propertyTypeKeys = {
    casa: "house",
    terreno: "land",
    "lote premium": "premiumLand",
    departamento: "apartment",
    townhouse: "townhouse",
  }

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
      value: name,
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
          value: category,
          placeholder: 'Tipo de cambio',
          label: 'Categoría',
          options: [
            {name: 'casa', value: 'casa'},
            {name: 'terreno', value: 'terreno'},
            {name: 'lote premium', value: 'lote premium'},
            {name: 'departamento', value: 'departamento'},
            {name: 'townhouse', value: 'townhouse'}
          ]
        },
        {
          type: 'select',
          name: 'group',
          flex: '1',
          value: group,
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
          value: area,
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
          value: type,
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
          value: address?.line_1,
          minWidth: '350px',
          flex: "2",
          placeholder: 'Dirección',
          label: 'Dirección',
        },
        {
          type: 'textInput',
          name: 'suburb',
          value: address?.suburb,
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
      value: address?.mapSrc,
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
          placeholder: 'Descripción corta en español',
          label: 'Descripción corta en español',
          type: 'textInput',
          minWidth: '350px',
          name: 'short_description_es',
          value: shortDescription?.es,
          multiline: '5',
        },
        {
          placeholder: 'Descripción corta en ingles',
          label: 'Descripción corta en ingles',
          minWidth: '350px',
          type: 'textInput',
          value: shortDescription?.en,
          name: 'short_description_en',
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
          placeholder: 'Descripción en español',
          label: 'Descripción en español',
          type: 'textInput',
          minWidth: '350px',
          name: 'description_es',
          value: description?.es,
          multiline: '10',
        },
        {
          placeholder: 'Descripción en ingles',
          label: 'Descripción en ingles',
          minWidth: '350px',
          type: 'textInput',
          value: description?.en,
          name: 'description_en',
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
                  value: features?.rooms,
                  placeholder: 'Cuartos',
                  label: 'Cuartos',
                },
                {
                  type: 'numberInput',
                  name: 'floors',
                  value: features?.floors,
                  placeholder: 'Pisos',
                  label: 'Pisos',
                },
                {
                  type: 'numberInput',
                  name: 'bathrooms',
                  value: features?.bathrooms,
                  placeholder: 'Baños',
                  label: 'Baños',
                },
                {
                  type: 'numberInput',
                  value: features?.car_slots,
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
                  value: measures?.land_area,
                  name: 'land_area',
                  flex: "1",
                  placeholder: 'Terreno',
                  label: 'Terreno',
                },
                {
                  type: 'numberInput',
                  value: measures?.built_area,
                  name: 'built_area',
                  flex: "1",
                  placeholder: 'Construcción',
                  label: 'Construcción',
                },
                {
                  type: 'numberInput',
                  value: measures?.front,
                  name: 'front',
                  flex: "1",
                  placeholder: 'Frente',
                  label: 'Frente',
                },
                {
                  type: 'numberInput',
                  name: 'bottom',
                  value: measures?.bottom,
                  flex: "1",
                  placeholder: 'Fondo',
                  label: 'Fondo',
                },
                {
                  type: 'numberInput',
                  value: measures?.left,
                  name: 'left',
                  flex: "1",
                  placeholder: 'Izquierda',
                  label: 'Izquierda',
                },
                {
                  type: 'numberInput',
                  value: measures?.right,
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
              value: currency,
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
              value: price,
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
    setState(params.values)
  }

  const onSave = async () => {
    const getMapSrc = (html:string) => {
      let extractedMapSrc = html
      if (!html) {
        return address?.mapSrc || ''
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

    const updatedValues = {
      address: {
        mapSrc: getMapSrc(state.mapSrc),
        line_1: state.line_1 || address?.line_1 || '',
        suburb: state.suburb || address?.suburb || ''
      },
      currency: state.currency || currency || 'mxn',
      description: {
        en: state.description_en || description?.en || '',
        es: state.description_es || description?.es || ''
      },
      shortDescription: {
        en: state.short_description_en || shortDescription?.en || '',
        es: state.short_description_es || shortDescription?.es || ''
      },
      features: {
        floors: state.floors || features?.floors || '',
        rooms: state.rooms || features?.rooms || '',
        bathrooms: state.bathrooms || features?.bathrooms || '',
        car_slots: state.car_slots || features?.car_slots || '',
      },
      isFeatured: state.isFeatured || isFeatured || '',
      measures: {
        bottom: state.bottom || measures?.bottom || '',
        front: state.front || measures?.front || '',
        land_area: state.land_area || measures?.land_area || '',
        built_area: state.built_area || measures?.built_area || '',
        left: state.left || measures?.left || '',
        right: state.right || measures?.right || '',
      },
      name: state.name || name || 'Propiedad sin nombre',
      price: state.price || price || '',
      property_type: state.property_type || property_type || '',
      type: state.type || type || 'inversión',
      area: state.area || area || 'playa',
      group: state.group || group || 'norte-poniente',
      category: state.category || category || 'casa',
    }

    try {
      await updatePropertyData({ id:`${id}`, data: updatedValues })
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
    data
  
    console.log('act',{data});
  }, [data])

  if (isLoading) {
    return <div>Loading...</div>
  }

  

  return ( 
    <StyledProperty>
      <Text textType="h3">Editar propiedad</Text>
      <Container>
        <input type="file" onChange={uploadFile} multiple></input>
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