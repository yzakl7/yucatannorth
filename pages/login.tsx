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
      <StyledLogin  className='login-form-container'>
        <Text textType='h4'>Login: </Text>
        <input type="text" onChange={(e:React.FormEvent<HTMLInputElement>) => setUserName(e.currentTarget.value)} />
        <input type="password" onChange={(e:React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} />
        <Button action={() => signIn()}>LOGIN</Button>
      </StyledLogin>
    </StyledLogin>
  )
}

export default Login