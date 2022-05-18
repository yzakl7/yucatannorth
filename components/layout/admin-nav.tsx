import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { getColor } from '../../utils/theme'
import { Container, Image, Text } from '../ui'
import { FiUsers } from 'react-icons/fi'
import { authSelectors, hooks } from '../../state'
import { Button } from '../inputs'

const StyledAdminNav = styled(Container)`
  gap: 16px;
  padding: 16px;
  button {
    padding: 8px;
    flex-direction: column;
    border-radius: 5px;
    height: 85px;
    width: 85px;
    align-items: center;
    background: ${getColor('primary')};
    justify-content: center;
    color: ${getColor('white')};
    gap: 8px;
    p {
      white-space: initial;
      color: ${getColor('white')}!important;
      font-weight: bolder;
    }
    svg {
      font-size: 32px;
    }
  }
`


export const AdminNav = () => {
  const { push } = useRouter()
  return (
    <StyledAdminNav>
      <Button action={() => push('/admin/user-manager')}>
        <FiUsers />
        <Text textType='p'>
          Administar Usuarios
        </Text>
      </Button>
    </StyledAdminNav>
  )
}

export default AdminNav