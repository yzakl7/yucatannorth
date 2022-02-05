import styled from '@emotion/styled'
import React, { ReactNode } from 'react'
import IconButton from '../UI/buttons/icon-button'
import { Card } from '../UI/style/card'
import Container from '../UI/style/container'

type PropertyCreateModalProps = {
  children: ReactNode
  dismissCallback?: () => void
  dismissModal: () => void
}

const StyledPropertyCreateModal = styled(Card)`
  background: white;
  padding: 32px;
  justify-content: center;
  align-items: center;
  gap: 32px;
`

export const PropertyCreateModal = ({
  children,
  dismissCallback,
  dismissModal
}: PropertyCreateModalProps) => {
  return (
    <StyledPropertyCreateModal>
      {children}
      <Container direction="row">
        <IconButton width="unset" onClick={dismissModal}>{`${dismissCallback ? 'cancelar' : 'Aceptar'}`}</IconButton>
        {dismissCallback && <IconButton width="unset" onClick={dismissCallback}>Aceptar</IconButton>}
      </Container>
    </StyledPropertyCreateModal>
  )
}
