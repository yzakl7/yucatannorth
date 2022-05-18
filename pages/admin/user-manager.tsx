import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Button, IconButton } from '../../components/inputs'
import { Container, Text } from '../../components/ui'
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
    padding: 16px;
    border: 1px solid ${getColor('border')};
  }
`

export const UserManager = () => {
  const { pathname } = useRouter()
  const { useAppDispatch, useAppSelector } = hooks
  const { getUserList } = userManagerOperations
  const { selectUserManager } = userManagerSelectors
  const { push } = useRouter()
  const { users } = useAppSelector(selectUserManager)
  const dispatch = useAppDispatch()

  const onGetUserList = () => {
    dispatch(getUserList())
  }

  const renderUsers = ( ) => {
    return users?.map(({email, role, active, id}: any) => (
      <Container className='user-container' key={id} direction='row'>
        <Container justify='center' flex='2'>
          <Text textType='p'>{email}</Text>
        </Container>
        <Container justify='center' flex='1'>
          <Text textType='p'>{role}</Text>
        </Container>
        <Container justify='center' flex='1'>
          <Text textType='p'>{`Activo: ${active ? 'si' : 'no'}`}</Text>
        </Container>
        <Container direction='row' justify='flex-end'>
          <IconButton tooltip="Editar">
            <RiEditBoxLine />
          </IconButton>
          <IconButton tooltip="Desactivar">
            <AiOutlinePoweroff />
          </IconButton>
          <IconButton tooltip="Eliminar">
            <AiOutlineDelete />
          </IconButton>
        </Container>
      </Container>
    ))
  }

  useEffect(() => {
    onGetUserList()
  }, [])
  

  return (
    <StyledUserManager>
      <Text textType='h2'>Administrador de Usuarios</Text>
      <Container align='flex-start'>
        <Button action={() => push('create-user')}><Text textType='p'>Add User</Text></Button>
      </Container>
      {renderUsers()}
    </StyledUserManager>
  )
}

export default UserManager