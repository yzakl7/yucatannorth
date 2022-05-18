import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button } from '../components/inputs'
import { Container, Text } from '../components/ui'
import { authOperations, authSelectors, hooks } from '../state'

const StyledLogin = styled(Container)`
  justify-content: center;
  border: 1px solid red;
  flex:1 ;
  align-items: center;
  .login-form-container {
    border: 1px solid;
    flex: unset;
    border-radius: 10px;
    padding: 32px;
  }
`

export const Login = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const { useAppDispatch, useAppSelector } = hooks
  const { logIn } = authOperations
  const dispatch = useAppDispatch()
  const { push } = useRouter()
  const { isAuthenticatedSelector } = authSelectors
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)

  const signIn = () => {
    dispatch(logIn({ userName, password }))
  }

  useEffect(() => {
    console.log({isAuthenticated});
    if (isAuthenticated) {
      push('/admin')
    }
    
  }, [isAuthenticated, push])
  

  return (
    <StyledLogin className='login-container'>
      <Container className='login-form-container' gap="32px">
        <Container>
          <Text textType='h4'>Login: </Text>
        </Container>
        <Container gap="4px">
          <Container gap='0'>
            <Text textType='p'>
              Usuario
            </Text>
            <input type="text" onChange={(e:React.FormEvent<HTMLInputElement>) => setUserName(e.currentTarget.value)} />
          </Container>
          <Container gap='0'>
            <Text textType='p'>
              Contraseña
            </Text>
            <input type="password" onChange={(e:React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} />
          </Container>
        </Container>
        <Container>
          <Button action={() => signIn()}>
            <Text textType='p'>
              INICIAR SESION
            </Text>
          </Button>
        </Container>
      </Container>
    </StyledLogin>
  )
}

export default Login