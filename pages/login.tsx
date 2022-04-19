import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, TextInput } from '../components/inputs'
import { Container, Text } from '../components/ui'
import { useAuth } from '../utils/auth/authContext'
import { getColor } from '../utils/theme'

const StyledLogin = styled(Container)`
  justify-content: center;
  align-items: center;
  height: 100%;
  .login-box {
    background: ${getColor('secondary')};
    padding: 32px;
    align-items: center;
    gap: 32px;
    h3 {
      font-size: 24px;
      color: ${getColor('primary')};
    }
    label div:nth-child(2) {
      flex-direction: row;
    }
  }
`

const Login = () => {
  const [password, setPassword] = useState('')
  const { signin }  = useAuth()
  const { push } = useRouter()

  const onSubmit = async () => {
    try {
      const resp = await signin('admin@yucatannorth.com', password)
      push('/admin')
      console.log({login: resp});
    } catch(err) {
      console.log({login: err});

    }
  }


  return (
    <StyledLogin>
      <Container className='login-box'>
        <Text textType='h3'>
          Area restringida
        </Text>
        <TextInput value={password} onChange={(pwd) => setPassword(pwd.value)} label='Contraseña' password bordered />
        <Button action={onSubmit} buttonStyle='primary'><Text textType='p'>Ingresar</Text></Button>
      </Container>
    </StyledLogin>
  )
}

export default Login