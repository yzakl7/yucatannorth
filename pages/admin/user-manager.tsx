import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton } from '../../components/inputs'
import { Container, Modal, Text } from '../../components/ui'
import { hooks } from '../../state'
import { userManagerOperations, userManagerSelectors } from '../../state/ducks/user-manager'
import { getColor } from '../../utils/theme'
import { AiOutlinePoweroff, AiOutlineDelete } from 'react-icons/ai'
import { RiEditBoxLine } from 'react-icons/ri'

const StyledUserManager = styled(Container)`
  padding: 16px;
  width: 100%;
  .user-container {
    border: 1px solid;
    gap: 16px;
    padding: 16px;
    border: 1px solid ${getColor('border')};
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
  white-space: nowrap;
`

export const UserManager = () => {
  const { pathname } = useRouter()
  const [deleteModal, setDeleteModal] = useState<any>({visibility: false, user: {}})
  const [disableModal, setDisableModal] = useState<any>({visibility: false, user: {}})
  const { useAppDispatch, useAppSelector } = hooks
  const { getUserList, deleteUser, updateUser } = userManagerOperations
  const { selectUserManager } = userManagerSelectors
  const { push } = useRouter()
  const { users, isFetching } = useAppSelector(selectUserManager)
  const dispatch = useAppDispatch()

  const onEdit = (uid:string) => {
    push(`./edit/${uid}`)
  }

  const onDelete = (uid:string) => {
    dispatch(deleteUser(uid))
    setDeleteModal({visibility: false, user: {}})
  }
  const onDisableToggle = (disabled: boolean, uid:string) => {
    dispatch(updateUser({disabled, uid }))
    setDisableModal({visibility: false, user: {}})
  }

  const renderDeleteModal = () => {
    return (
      <Container className='modal-content'>
        <Container />
        <Text textType='h4'>{`¿Deseas eliminar ${deleteModal.user.email}?`}</Text>
        <Container className='buttons-container'>
          <Button buttonStyle='borderless' action={() => setDeleteModal({visibility: false, user: {}})}>
            <Text textType='p'>
              Cancelar
            </Text>
          </Button>
          <Button action={() => onDelete(deleteModal.user.uid)}>
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
        <Text textType='h4'>{`¿Deseas desactivar ${disableModal.user.email}?`}</Text>
        <Container className='buttons-container'>
          <Button buttonStyle='borderless' action={() => setDisableModal({visibility: false, user: {}})}>
            <Text textType='p'>
              Cancelar
            </Text>
          </Button>
          <Button action={() => onDisableToggle(!disableModal.user.disabled, disableModal.user.uid)}>
            <Text textType='p'>
              {`${!disableModal.user.disabled ? 'Desactivar' : 'Activar' }`}
            </Text>
          </Button>
        </Container>
      </Container>
    )
  }

  
  const renderUsers = ( ) => {
    return users?.map((user: any) => {
      const {email, disabled, uid, metadata, customClaims} = user 
      return (
        <Container className='user-container' key={`${uid}`} direction='row'>
          <Modal onClose={() => setDeleteModal({visibility: false, user: {}})} isVisible={deleteModal.visibility} content={renderDeleteModal()}/>
          <Modal onClose={() => setDisableModal({visibility: false, user: {}})} isVisible={disableModal.visibility} content={renderDisableModal()}/>
          <Container justify='' flex='1.5'>
            <Text textType='h3'>Email:</Text>
            <Text textType='p'>{email}</Text>
          </Container>
          <Container justify='' flex='0.75'>
            <Text textType='h3'>Creado: </Text>
            <Text textType='p'>{new Date(metadata.creationTime).toLocaleDateString()}</Text>
          </Container>
          <Container justify='' flex='1'>
            {
              metadata.lastSignInTime 
              ? (
                <>
                  <Text textType='h3'>Ultimo inicio de sesión: </Text>
                  <Text textType='p'>{`${new Date(metadata.lastSignInTime).toLocaleDateString()}, ${new Date(metadata.lastSignInTime).toLocaleTimeString()}`}</Text>
                </>
              )
              : (
                <>
                  <Text textType='h3'>Ultimo inicio de sesión: </Text>
                  <Text textType='p'>Sin primer inicio</Text>
                </>
              )
            }
          </Container>
          <Container justify='' flex='0.5'>
            <Text textType='h3'>Estado:</Text>
            <Text textType='p'>{`${!disabled ? 'Activo' : 'Inactivo'}`}</Text>
          </Container>
          <Container justify='' flex='1'>
            <Text textType='h3'>Rol:</Text>
            <Text textType='p'>{`${customClaims?.role || 'super admin'}`}</Text>
          </Container>
          <Container direction='row' flex='0.5' align='center' justify='flex-end'>
            {
              customClaims && (
                <>
                  <IconButton tooltip="Editar" onClick={() => onEdit(uid)}>
                    <RiEditBoxLine />
                  </IconButton>
                  <IconButton tooltip={`${disabled ? 'Activar' : 'Desactivar'}`} onClick={() => setDisableModal({visibility: true, user})}>
                    <AiOutlinePoweroff />
                  </IconButton>
                  <IconButton tooltip="Eliminar" onClick={() => setDeleteModal({visibility: true, user})}>
                    <AiOutlineDelete />
                  </IconButton>
                </>
              )
            }
          </Container>
        </Container>
      )
    })
  }

  useEffect(() => {
    dispatch(getUserList())
  }, [dispatch, getUserList])

  if (isFetching) {
    return <Text textType='h3'>Loading</Text>
  }
  

  return (
    <StyledUserManager>
      <Text textType='h2'>Administrador de Usuarios</Text>
      <Container align='flex-end'>
        <Button action={() => push('create-user')}><Text textType='p'>Crear Usuario</Text></Button>
      </Container>
      {renderUsers()}
    </StyledUserManager>
  )
}

export default UserManager