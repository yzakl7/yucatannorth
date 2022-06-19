import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Button } from '../../../components/inputs'
import { Container, Text } from '../../../components/ui'
import { hooks } from '../../../state'
import { userManagerOperations, userManagerSelectors } from '../../../state/ducks/user-manager'


const StyledCreateUser = styled(Container)`
  padding: 16px;
  input, select {
    padding: 8px;
  }
  align-items: flex-start;
`

export const CreateUser = () => {
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('sales')
  const { useAppDispatch, useAppSelector } = hooks
  const {push} = useRouter()
  const { selectUserManager } = userManagerSelectors
  

  const { createUser } = userManagerOperations
  const { error } = useAppSelector(selectUserManager)
  const dispatch = useAppDispatch()

  const onCreateUser = () => {
    if (password === repeatPassword) {
      dispatch(createUser({password, email, role}))
    } 
    push('/admin/user-manager')
  }

  return (
    <StyledCreateUser className='create-user-container' gap="32px">
      <Text textType='h2'>
        Crear usuario
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
        <Container>
          <Text textType='p'>Contraseña</Text>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
        </Container>
        <Container>
          <Text textType='p'>Repetir Contraseña</Text>
          <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} placeholder="password"/>
        </Container>
      </Container>
      <Container>
        <Button isDisabled={(password !== repeatPassword) || !password || !email} action={onCreateUser}><Text textType='p'>Agregar</Text></Button>
      </Container>
      {error && <Text textType='p'>{error.message}</Text>}
    </StyledCreateUser>
  )
}

export default CreateUser