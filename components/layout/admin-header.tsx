import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { getColor } from '../../utils/theme'
import { Container, Image, Text } from '../ui'
import { IoMenu, IoClose } from 'react-icons/io5'
import { Button } from '../inputs'
import { authOperations, authSelectors, hooks } from '../../state'

const StyledAdminHeader = styled(Container)`
  .nav-container {
    background: ${getColor('primary')};
    flex-direction: row;
    padding: 16px;
    position: fixed;
    z-index: 16;
    width: 100%;
    justify-content: space-between;
    gap: 16px;
    top: 0;
  }
  @media(max-width: 1023px) {
  }
  button {
    background: none;
    color: ${getColor('white')}
  }
  p {
    color: ${getColor('white')}
  }
  .spacer {
    height: 67px;
  }

`

export const AdminHeader = () => {
  const {push} = useRouter()
  const { useAppSelector, useAppDispatch } = hooks
  const { isAuthenticatedSelector, selectAuth } = authSelectors
  const { logOut } = authOperations
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  const Auth = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()
  
  const onLogout = () => {
    dispatch(logOut())
  }

  if (!isAuthenticated) return null

  const user = Auth.user?.providerData[0]?.displayName || Auth.user?.email
  return (
    <StyledAdminHeader>
      <Container className='spacer'></Container>
      <Container className='nav-container'>
        <Container justify="center">
          <Text textType='p'>
            {/* {`Hola, ${user}!`} */}
          </Text>
        </Container>
        <Container direction='row'>
          <Button action={() => push('/')}>
            <Text textType='h4'> WEB </Text>
          </Button>
          <Button action={() => push('/admin')}>
            <Text textType='h4'> ADMIN </Text>
          </Button>
          <Button action={onLogout}>
            <Text textType='h4'> CERRAR SESION </Text>
          </Button>
        </Container>
      </Container>
    </StyledAdminHeader>
  )
}

export default AdminHeader