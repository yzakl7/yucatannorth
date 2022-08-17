import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, SearchInput } from '../../../components/inputs'
import { Container, Image, Modal, Paginator, Text } from '../../../components/ui'
import { hooks, settingsOperations, sparePartsOperations, sparePartsSelectors } from '../../../state'
import { getColor } from '../../../utils/theme'
import { AiOutlineClear, AiOutlineDelete, AiOutlinePicture } from 'react-icons/ai'
import { RiEditBoxLine } from 'react-icons/ri'
import { FcPicture } from 'react-icons/fc'
import { FaSearch } from 'react-icons/fa'
import { Filters } from '../../../components/layout'
import { getFormattedGoogleDriveUrl } from '../../../utils/formatter'
import { v4 as uuid } from 'uuid'

const StyledSpareParts = styled(Container)`
  padding: 16px;
  width: 100%;
  max-width: calc(100% - 117px);
  button {
    gap: 8px;
  }
  .spare-part-list-container {
    overflow: auto;
    max-height: 100%;
  }
  .modal-content {
    justify-content: center;
    align-items: center;
    background: ${getColor('white')};
    width: 350px;
    padding: 32px;
    justify-content: space-between;
    h4 {
      white-space: break-spaces;
      text-align: center;
      line-height: 32px;
    }
    .buttons-container {
      justify-content: space-between;
      flex-direction: row;
      width: 100%;
    }
  }
  .sparePart-container {
    border: 1px solid;
    gap: 16px;
    padding: 16px;
    border: 1px solid ${getColor('border')};
    flex-direction: column;
    .details-container {
      flex-direction: row;
      .image-container {
        width: 75px;
        height: 75px;
        img {
          object-fit: cover;
        }
      }
    }

  }
  .description-container {
    white-space: break-spaces;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 32px;

  }
  white-space: nowrap;
  .no-results-filters-container {
    max-width: 800px;
    padding-top: 32px;
  }
  .pill {
    border: 1px solid ${getColor('border')};
    padding: 4px 8px;
    border-radius: 4px;
  }
`

export const SpareParts = ({noEdit}: {noEdit:boolean}) => {
  const { pathname } = useRouter()
  const [deleteModal, setDeleteModal] = useState<any>({visibility: false, sparePart: {}})
  const [filtersModal, setFiltersModal] = useState<any>(false)
  const [disableModal, setDisableModal] = useState<any>({visibility: false, sparePart: {}})
  const [searchValue, setSearchValue] = useState('')
  const [year, setYear] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({})
  const { useAppDispatch, useAppSelector } = hooks
  const { clearSparePartList, getSparePartList, clearSelectedSparePart, deleteSparePartItem, updateSparePartItem } = sparePartsOperations
  const { selectSpareParts } = sparePartsSelectors
  const { push } = useRouter()
  const { sparePartList, isFetching } = useAppSelector(selectSpareParts)

  const dispatch = useAppDispatch()

  const onEdit = (uid:string) => {
    push(`./spare-parts/${uid}`)
  }

  const onDelete = (id:string) => {
    dispatch(deleteSparePartItem({id}))
    setDeleteModal({visibility: false, sparePart: {}})
  }
  const onDisableToggle = (disabled: boolean, id:string) => {
    dispatch(updateSparePartItem({params: {disabled, id }}))
    setDisableModal({visibility: false, sparePart: {}})
  }

  const onSearchValueChange = (newSearchValue:string) => {
    setSearchValue(newSearchValue)
  }

  const onSearch = () => {
    dispatch(getSparePartList(({query: searchValue})))
  }

  const onSearchFilters = () => {
    setFiltersModal(false)
    dispatch(getSparePartList(({filters, year})))
  }

  const renderFiltersModal = () => {
    return (
      <Container className='modal-content'>
        <Container />
        <Filters value={filters} onChange={(param:any) => onChangeFilters(param)} />
        <Container className='buttons-container'>
          <Button buttonStyle='borderless' action={() => setFiltersModal(false)}>
            <Text textType='p'>
              Cancelar
            </Text>
          </Button>
          <Button action={onSearchFilters}>
            <Text textType='p'>
              Buscar
            </Text>
          </Button>
        </Container>
      </Container>
    )
  }

  const renderDeleteModal = () => {
    return (
      <Container className='modal-content'>
        <Container />
        <Text textType='h4'>{`¿Deseas eliminar ${deleteModal.sparePart.name}?`}</Text>
        <Container className='buttons-container'>
          <Button buttonStyle='borderless' action={() => setDeleteModal({visibility: false, sparePart: {}})}>
            <Text textType='p'>
              Cancelar
            </Text>
          </Button>
          <Button action={() => onDelete(deleteModal.sparePart.id)}>
            <Text textType='p'>
              Eliminar
            </Text>
          </Button>
        </Container>
      </Container>
    )
  }
  
  const renderDisableModal = () => {
    return (
      <Container className='modal-content'>
        <Container />
        <Text textType='h4'>{`¿Deseas desactivar ${disableModal.sparePart.name}?`}</Text>
        <Container className='buttons-container'>
          <Button  buttonStyle='borderless' action={() => setDisableModal({visibility: false, sparePart: {}})}>
            <Text textType='p'>
              Cancelar
            </Text>
          </Button>
          <Button action={() => onDisableToggle(!disableModal.sparePart.disabled, disableModal.sparePart.id)}>
            <Text textType='p'>
              {`${!disableModal.sparePart.disabled ? 'Desactivar' : 'Activar' }`}
            </Text>
          </Button>
        </Container>
      </Container>
    )
  }
  
  const renderSpareParts = ( ) => {
    return (
      <Container className='spare-part-list-container'>
        {noEdit && <Modal onClose={() => setDeleteModal({visibility: false, sparePart: {}})} isVisible={deleteModal.visibility} content={renderDeleteModal()}/>}
        {noEdit && <Modal onClose={() => setDisableModal({visibility: false, sparePart: {}})} isVisible={disableModal.visibility} content={renderDisableModal()}/>}
        {
          sparePartList?.map((sparePart: any) => {
            const { 
              name,
              sku,
              id,
              description,
              car_brand,
              similars,
              item_brand,
              imageUrl,
              category,
              family,
              liters,
              motor,
              support_models,
              valves,
              years
            } = sparePart 
            const filters = [
              {key: "category", value: category, label: 'Categoría' },
              {key: "family", value: family, label: 'Producto' },
              {key: "liters", value: liters, label: 'Lts' },
              {key: "motor", value: motor, label: 'Motor' },
              {key: "support_models", value: support_models, label: 'Modelo' },
              {key: "valves", value: valves, label: 'Válvulas' },
              {
                key: "years", value: `${years[0] } - ${years[1]}`, label: 'Años'
              }
            ]
            return (
              <Container className='sparePart-container' key={`${id}`}>
                <Container className='details-container' gap='32px'> 
                  <Container className='image-container'>
                    {
                      imageUrl
                      ? <Image src={getFormattedGoogleDriveUrl(imageUrl)} alt='spare part image' />
                      : <FcPicture size={75}/>
                    }
                  </Container>
                  <Container justify='' flex='1'>
                    <Text textType='h3'>Clave de producto:</Text>
                    <Text textType='p'>{sku || id}</Text>
                  </Container>
                  <Container justify='' flex='1'>
                    <Text textType='h3'>Marca de vehículo:</Text>
                    <Text textType='p'>{car_brand}</Text>
                  </Container>
                  <Container justify='' flex='1'>
                    <Text textType='h3'>Marca de producto:</Text>
                    <Text textType='p'>{item_brand}</Text>
                  </Container>
                  <Container justify='' flex='1'>
                    <Text textType='h3'>Nombre:</Text>
                    <Text textType='p'>{name}</Text>
                  </Container>
                  {!noEdit && <Container direction='row' flex='0.5' align='center' justify='flex-end'>
                    <IconButton tooltip="Editar" onClick={() => onEdit(sparePart.id)}>
                      <RiEditBoxLine />
                    </IconButton>
                    {/* <IconButton tooltip={`${disabled ? 'Activar' : 'Desactivar'}`} onClick={() => setDisableModal({visibility: true, sparePart})}>
                      <AiOutlinePoweroff />
                    </IconButton> */}
                    <IconButton tooltip="Eliminar" onClick={() => setDeleteModal({visibility: true, sparePart})}>
                      <AiOutlineDelete />
                    </IconButton>
                  </Container>}
                </Container>
                <Container direction='row' wrap='wrap'>
                  {
                      Object.keys(filters).map((filter:any) => (
                        filters[filter].key
                        ?
                          <Container key={uuid()} className='pill' direction='row'>
                            <Text textType='span'>
                              {filters[filter].label}
                            </Text>
                            <Text textType='span'>
                              {filters[filter].value}
                            </Text>
                          </Container>
                        : <></>
                      ))
                    }
                </Container>
                {description && <Container className='description-container'>
                  <Container className='description'>
                    <Text textType='h3'>Descripción:</Text>
                    <Text textType='p'>{`${description}`}</Text>
                  </Container>
                  {similars && <Container className='similars'>
                    <Text textType='h3'>Similares:</Text>
                    <Text textType='p'>{`${similars}`}</Text>
                  </Container>}
                </Container>}
              </Container>
            )
          })
        }
      </Container>
    )
  }

  const onChangeFilters = (filters:any) => {
    const newFilters = {...filters}
    delete newFilters.year
    setYear(filters.year)
    setFilters(newFilters)
  }

  useEffect(() => {
    dispatch(clearSelectedSparePart())
    dispatch(clearSparePartList())
  }, [])
  

  if (isFetching) {
    return <Text textType='h3'>Loading</Text>
  }
  
  return (
    <StyledSpareParts className='spare-parts-container'>
      <Modal onClose={() => setFiltersModal(false)} isVisible={filtersModal} content={renderFiltersModal()}/>
      <Container align='center' direction='row'>
        {!noEdit && <Button buttonStyle='primaryReverse' action={() => push('./spare-parts/add-spare-part')}><Text textType='p'>Agregar refaccion</Text></Button>}
        {!!sparePartList?.length && (
          <>
            <Button buttonStyle='primary' action={() => setFiltersModal(true)}>
              <Text textType='p'>
                Encontrar refaccion
              </Text>
              <FaSearch color='white'/>
            </Button>
            <Button borders={false} action={() => dispatch(clearSparePartList())}>
              <Text textType='p'>
                Limpiar Búsqueda
              </Text>
              <AiOutlineClear />
            </Button>
          </>
        )}
      </Container>
      { !sparePartList?.length && (
        <Container className='no-results-filters-container' gap='32px'>
          <Filters value={filters} onChange={(param:any) => onChangeFilters(param)} />
          <Container align='flex-end'>
            <Button buttonStyle='primary' action={() => onSearchFilters()}>
              <Text textType='p'>
                Buscar
              </Text>
              <FaSearch color='white'/>
            </Button>
          </Container>
        </Container>
      )}
      {renderSpareParts()}
    </StyledSpareParts>
  )
}

export default SpareParts