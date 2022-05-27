import styled from '@emotion/styled'
import { user } from 'firebase-functions/v1/auth'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/inputs'
import { Container, Text } from '../../../components/ui'
import { hooks } from '../../../state'
import { userManagerOperations, userManagerSelectors } from '../../../state/ducks/user-manager'


const StyledUpdateUser = styled(Container)`
  padding: 16px;
  input, select {
    padding: 8px;
  }
  align-items: flex-start;
`

export const UpdateUser = () => {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('sales')
  const { useAppDispatch, useAppSelector } = hooks
  const { push, query } = useRouter()
  const { selectUserManager } = userManagerSelectors
  

  const { updateUser } = userManagerOperations
  const { error, users } = useAppSelector(selectUserManager)
  const dispatch = useAppDispatch()

  const found = users.find(({uid}:any)=> uid === query.uid)


  // const selectedUser = users?.find(({uid}:any) => uid === query.uid)

  const onUpdateUser = () => {
    console.log({found});
    dispatch(updateUser({ email, role, uid: found.uid }))
    push('/admin/user-manager')
  }

  useEffect(() => {
    console.log({found});
    if (users) {
      setEmail(found.email)
      setRole(found.customClaims?.role)
    }
  }, [found, users])
  

  return (
    <StyledUpdateUser className='create-user-container' gap="32px">
      <Text textType='h2'>
        Editar usuario
      </Text>
      <Container gap='16px'> 
        <Container>
          <Text textType='p'>Nombre de Usuario</Text>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"/>
        </Container>
        <Container>
          <Text textType='p'>Rol</Text>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="sales">Ventas</option>
            <option value="admin">Administrador</option>
          </select>
        </Container>
      </Container>
      <Container>
        <Button isDisabled={!email} action={onUpdateUser}><Text textType='p'>Guardar</Text></Button>
      </Container>
      {error && <Text textType='p'>{error.message}</Text>}
    </StyledUpdateUser>
  )
}

export default UpdateUser