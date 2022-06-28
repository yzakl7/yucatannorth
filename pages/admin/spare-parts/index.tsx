import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton } from '../../../components/inputs'
import { Container, Modal, Text } from '../../../components/ui'
import { hooks, sparePartsOperations, sparePartsSelectors } from '../../../state'
import { getColor } from '../../../utils/theme'
import { AiOutlinePoweroff, AiOutlineDelete } from 'react-icons/ai'
import { RiEditBoxLine } from 'react-icons/ri'

const StyledSpareParts = styled(Container)`
  padding: 16px;
  width: 100%;
  max-width: calc(100% - 117px);
  .sparePart-container {
    border: 1px solid;
    gap: 16px;
    padding: 16px;
    border: 1px solid ${getColor('border')};
    flex-direction: column;
    .details-container {
      flex-direction: row;
    }
    .modal-content {
      justify-content: center;
      align-items: center;
      background: ${getColor('white')};
      height: 250px;
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
  }
  .description-container {
    white-space: break-spaces;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 32px;

  }
  white-space: nowrap;
`

export const SpareParts = () => {
  const { pathname } = useRouter()
  const [deleteModal, setDeleteModal] = useState<any>({visibility: false, sparePart: {}})
  const [disableModal, setDisableModal] = useState<any>({visibility: false, sparePart: {}})
  const { useAppDispatch, useAppSelector } = hooks
  const { getSparePartList, deleteSparePartItem, updateSparePartItem } = sparePartsOperations
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
    return sparePartList?.map((sparePart: any) => {
      const { 
        name,
        sku,
        id,
        description,
        disabled,
        brand,
        similars
      } = sparePart 
      return (
        <Container className='sparePart-container' key={`${id}`}>
          <Modal onClose={() => setDeleteModal({visibility: false, sparePart: {}})} isVisible={deleteModal.visibility} content={renderDeleteModal()}/>
          <Modal onClose={() => setDisableModal({visibility: false, sparePart: {}})} isVisible={disableModal.visibility} content={renderDisableModal()}/>
          <Container className='details-container' gap='32px'> 

            <Container justify='' flex='1'>
              <Text textType='h3'>Clave de producto:</Text>
              <Text textType='p'>{sku || id}</Text>
            </Container>
            <Container justify='' flex='1'>
              <Text textType='h3'>Marca de producto:</Text>
              <Text textType='p'>{brand}</Text>
            </Container>
            {/* <Container justify='' flex='1'>
              <Text textType='h3'>Nombre:</Text>
              <Text textType='p'>{name}</Text>
            </Container> */}
            <Container direction='row' flex='0.5' align='center' justify='flex-end'>
              <IconButton tooltip="Editar" onClick={() => onEdit(sparePart.id)}>
                <RiEditBoxLine />
              </IconButton>
              <IconButton tooltip={`${disabled ? 'Activar' : 'Desactivar'}`} onClick={() => setDisableModal({visibility: true, sparePart})}>
                <AiOutlinePoweroff />
              </IconButton>
              <IconButton tooltip="Eliminar" onClick={() => setDeleteModal({visibility: true, sparePart})}>
                <AiOutlineDelete />
              </IconButton>
            </Container>
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

  useEffect(() => {
    dispatch(getSparePartList())
  }, [])

  if (isFetching) {
    return <Text textType='h3'>Loading</Text>
  }
  

  return (
    <StyledSpareParts>
      <Container align='center' direction='row' justify='space-between'>
        <Text textType='h2'>Lista de refacciónes</Text>
        <Button buttonStyle='primaryReverse' action={() => push('./spare-parts/add-spare-part')}><Text textType='p'>Agregar refaccion</Text></Button>
      </Container>
      {renderSpareParts()}
    </StyledSpareParts>
  )
}

export default SpareParts