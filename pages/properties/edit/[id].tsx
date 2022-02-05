import { useRouter } from 'next/router'
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../_app'
import Container from '../../../components/UI/style/container'
import styled from '@emotion/styled'
import { Fragment, ReactNode, useContext, useEffect, useState } from 'react'
import { LangContext } from '../../../utils/lang/langContext'
import Form from '../../../components/UI/form/form'
import { Text } from '../../../components/UI/style/text'
import IconButton from '../../../components/UI/buttons/icon-button'
import { deleteImage, deleteProperty, getImageList, getPropertyData, updatePropertyData, uploadImage } from '../../../components/api/firebaseAPI'
import { PropertyUpdateMessage } from '../../../components/properties/property-update-message'
import { getDownloadURL, ListResult, StorageReference } from 'firebase/storage'
import Tooltip from '../../../components/UI/style/tooltip'
import { AiOutlineDelete } from 'react-icons/ai'
import { SlidesType } from '../../../components/properties/types'

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
  .thumbnail {
    .image-preview {
      position: absolute;
      background: white;
      align-items: flex-start;
      display: none;
      z-index: 5;
      top: 100%;
      .delete-button {
        cursor: pointer;
        &:hover {
          border: 1px solid;
        }
      }
    }
    &:hover .image-preview {
      display: flex;
    }
  }
`

const Property = (props:any) => {
  const { data, callModal, dismissModal } = props
  const [state, setState] = useState<Record<string, string>>({})
  const router = useRouter()
  const [isLoading, setisLoading] = useState(true)
  const { dictionary, userLanguage } = useContext(LangContext) || ''
  const [imagesLoading, setImagesLoading] = useState(false)
  const { pathname, push } = useRouter()
  const {
    isFeatured,
    features,
    description,
    address,
    name,
    id,
    measures,
    currency,
    property_type,
    price_total,
    price_m2,
    location,
    images = [],
    area
  } = data || ''

  const propertyImages: SlidesType[] = images.map(({name, imgUrl}: Record<string, string>) => ({
    name,
    src: imgUrl,
    alt: name
  }))

  const propertyType = {
    house: "casa",
    land: "terreno",
    premiumLand: "lote premium",
    apartment: "departamento",
    townhouse: "townhouse",
  }

  const areaType = {
    beach: "playa",
    city: "ciudad",
  }

  const areaKeys = {
    ciudad: "city",
    playa: "beach",
  }

  const propertyTypeKeys = {
    casa: "house",
    terreno: "land",
    "lote premium": "premiumLand",
    departamento: "apartment",
    townhouse: "townhouse",
  }

  const formData: CommonProps[] = [
    {
      name: 'nameInputGroup',
      type: 'inputGroup',
      wrap: true,
      array: [
        {
          minWidth: '200px',
          type: 'textInput',
          name: 'name',
          flex: "1",
          value: name,
          placeholder: 'Nombre',
        },
        {
          type: 'select',
          name: 'property_type',
          flex: 'unset',
          value: (propertyType as Record<string, string>)[property_type],
          placeholder: 'Tipo de cambio',
          options: ['casa', 'terreno', 'lote premium', 'departamento', 'townhouse']
        },
        {
          type: 'select',
          name: 'location',
          flex: 'unset',
          value: location,
          placeholder: 'Categoría',
          options: ['norte-poniente', 'norte-oriente']
        },
          {
          type: 'select',
          name: 'area',
          flex: 'unset',
          value: area,
          placeholder: 'area',
          options: ['playa', 'ciudad']
        },
        {
          type: 'switch',
          label: 'Destacar',
          name: 'newsletter',
          flex: "unset",
          value: isFeatured
        },
      ]
    },

    {
      name: 'addressAndPriceGroup',
      type: 'inputGroup',
      direction: 'row',
      wrap: true,
      array: [
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
              flex: "21",
              placeholder: 'Dirección',
            },
            {
              type: 'textInput',
              name: 'suburb',
              value: address?.suburb,
              minWidth: '350px',
              flex: "1",
              placeholder: 'Colonia',
            },
            {
              type: 'textInput',
              name: 'mapSrc',
              value: address?.mapSrc,
              minWidth: '350px',
              flex: "2",
              placeholder: 'URL de mapa',
            },
          ]
        },

        {
          name: 'priceGroup',
          direction: 'row',
          type: 'inputGroup',
          flex: '1',
          wrap: true,
          array: [
            {
              type: 'numberInput',
              minWidth: '180px',
              name: 'price_total',
              value: price_total,
              flex: "1",
              placeholder: 'Precio total',
            },
            {
              type: 'numberInput',
              minWidth: '180px',
              value: price_m2,
              name: 'price_m2',
              flex: "1",
              placeholder: 'Precio en M2',
            },
            {
              name: 'currencyGroup',
              minWidth: '150px',
              type: 'inputGroup',
              flex: '1',
              wrap: true,
              array: [
                {
                  type: 'title',
                  flex: '1',
                  label: 'Moneda',
                },
                {
                  type: 'select',
                  name: 'currency',
                  flex: 'unset',
                  value: currency,
                  placeholder: 'Tipo de cambio',
                  options: ['usd', 'mxn']
                }
              ]
            },
          ]
        },
      ]
    },
    

    {
      name: 'descriptionInputGroup',
      type: 'inputGroup',
      wrap: true,
      array: [
        {
          placeholder: 'Descripción en español',
          type: 'textInput',
          minWidth: '350px',
          name: 'description_es',
          value: description?.es,
          multiline: '10',
        },
        {
          placeholder: 'Descripción en ingles',
          minWidth: '350px',
          type: 'textInput',
          value: description?.en,
          name: 'description_en',
          multiline: '10',
        }
      ]
    },

    {
      name: 'featuresAndMeasuresInputGroup',
      type: 'inputGroup',
      wrap: true,
      array: [
        {
          name: 'featuresInputGroup',
          flex: '1',
          type: 'inputGroup',
          direction: 'column',
          array: [
            {
              type: 'title',
              label: 'Características',
            },
            {
              name: 'featuresGroup',
              type: 'inputGroup',
              direction: 'column',
              array: [
                {
                  type: 'numberInput',
                  name: 'rooms',
                  value: features?.rooms,
                  minWidth: '350px',
                  flex: "1",
                  placeholder: 'Cuartos',
                },
                {
                  type: 'numberInput',
                  name: 'floors',
                  value: features?.floors,
                  minWidth: '350px',
                  flex: "unset",
                  placeholder: 'Pisos',
                },
                {
                  type: 'numberInput',
                  minWidth: '350px',
                  name: 'bathrooms',
                  value: features?.bathrooms,
                  flex: "unset",
                  placeholder: 'Baños',
                },
                {
                  type: 'numberInput',
                  minWidth: '350px',
                  value: features?.car_slots,
                  name: 'car_slots',
                  flex: "unset",
                  placeholder: 'Cajones de estacinamiento',
                },
                
              ]
              
            },
          ]
        },
        {
          name: 'measuresInputGroup',
          flex: '1',
          type: 'inputGroup',
          direction: 'column',
          array: [
            {
              type: 'title',
              label: 'Medidas',
            },
            {
              name: 'measuresGroup',
              type: 'inputGroup',
              direction: 'column',
              array: [
                {
                  type: 'numberInput',
                  value: measures?.land_area,
                  minWidth: '350px',
                  name: 'land_area',
                  flex: "1",
                  placeholder: 'Terreno',
                },
                {
                  type: 'numberInput',
                  value: measures?.built_area,
                  minWidth: '350px',
                  name: 'built_area',
                  flex: "1",
                  placeholder: 'Construcción',
                },
                {
                  type: 'numberInput',
                  value: measures?.front,
                  minWidth: '350px',
                  name: 'front',
                  flex: "1",
                  placeholder: 'Frente',
                },
                {
                  type: 'numberInput',
                  name: 'bottom',
                  value: measures?.bottom,
                  minWidth: '350px',
                  flex: "1",
                  placeholder: 'Fondo',
                },
                {
                  type: 'numberInput',
                  value: measures?.left,
                  name: 'left',
                  minWidth: '350px',
                  flex: "1",
                  placeholder: 'Izquierda',
                },
                {
                  type: 'numberInput',
                  value: measures?.right,
                  name: 'right',
                  minWidth: '350px',
                  flex: "1",
                  placeholder: 'Derecha',
                },
                
              ]
              
            },
          ]
        },
      ]
    },
  ]

  const onChange = (params: { values: Record<string, string>; hasErrors: boolean; }) => {
    setState(params.values)
  }

  const renderModal = (message:string, callback?: ( ) => void) => {
    
    return (
      <PropertyUpdateMessage dismissModal={dismissModal} dismissCallback={callback} >
        {message}
      </PropertyUpdateMessage>
    )
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
      currency: state.currency || currency || '',
      description: {
        en: state.description_en || description?.en || '',
        es: state.description_es || description?.es || ''
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
      name: state.name || name || '',
      price_m2: state.price_m2 || price_m2 || '',
      price_total: state.price_total || price_total || '',
      property_type: (propertyTypeKeys as Record<string, string>)[state.property_type] || property_type || '',
      location: state.location || location || '',
      area: (areaKeys as Record<string, string>)[state.area] || area || '',
    }
    try {
      await updatePropertyData({ id, data: updatedValues })
      callModal(renderModal('Los dato han sido guardados con exito'))
    } catch(error) {
      console.error(error)
    }
  }

  const onDelete = async () => {
    const callback = async ( )=> {
      try {
        await deleteProperty(id)
        push('/admin')
        dismissModal()
      } catch(error) {
        console.error(error)
      }
    }
    callModal(
      renderModal(
        '¿Seguro que deseas eliminar la propiead?',
        callback
      )
    )
  }



  const uploadFile = (e:any) => {
    const fileList = e.target.files
    const fileArray = []
    const doUpload = async (id:string, name:string, file:any) => {
      const response = await uploadImage(id, name, file)
      return response
    }

    for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
      const file = fileList[i];
      doUpload(id, file.name, file)
    }

  }
  
  const onDeleteImage = async (imageName:string) => {
    try {
      const res = await deleteImage(id, imageName)
    } catch(err) {
      throw(err)
    }
  }

  useEffect(() => {
    setisLoading(false)
  }, [id]) 

  if (router.isFallback || isLoading) {
    return <div>Loading...</div>
  }

  return ( 
    <StyledProperty>
      <Text textType="h3">Editar propiedad</Text>
      <input type="file" onChange={uploadFile} multiple></input>
      <Container direction='row'>
        {
          propertyImages.map(({src, name}:any) => {
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
                  <img alt="" src={src}></img>
                </Container>
              </Container>
            )
          })
        }
        {
          imagesLoading && 'Loading'
        }
      </Container>
      <Form data={formData} onChange={onChange} />
      <IconButton onClick={onSave}>Guardar</IconButton>
      <IconButton onClick={onDelete}>Eliminar propiedad</IconButton>
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