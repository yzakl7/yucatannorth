import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { getColor } from '../../utils/theme'
import { Container, Image, Text } from '../ui'
import { IoMenu, IoClose } from 'react-icons/io5'
import { Button } from '../inputs'
import { authSelectors, hooks } from '../../state'

const StyledAdminHeader = styled(Container)`
  .nav-container {

    background: ${getColor('primary')};
    flex-direction: row;
    padding: 16px;
    position: fixed;
    z-index: 16;
    width: 100%;
    justify-content: flex-end;
    gap: 16px;
    top: 0;
  }
  @media(max-width: 1023px) {
  }
  button {
    background: none;
    color: ${getColor('white')}
  }
  .spacer {
    height: 68px;
  }


`

export const AdminHeader = () => {
  const {pathname, push} = useRouter()
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
  const { useAppDispatch, useAppSelector } = hooks
  const { isAuthenticatedSelector } = authSelectors
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)

  if (!isAuthenticated) return null

  return (
    <StyledAdminHeader>
      <Container className='spacer'></Container>

      <Container className='nav-container'>
        <Button action={() => push('/')}>
          <Text textType='h4'> WEB </Text>
        </Button>
        <Button action={() => push('/admin')}>
          <Text textType='h4'> ADMIN </Text>
        </Button>
        <Button action={() => push('/admin')}>
          <Text textType='h4'> ADMIN </Text>
        </Button>
      </Container>
    </StyledAdminHeader>
  )
}

export default AdminHeader