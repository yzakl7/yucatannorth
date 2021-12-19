import styled from '@emotion/styled'
import React, { ReactNode } from 'react'
import IconButton from '../UI/buttons/icon-button'
import { Card } from '../UI/style/card'
import Container from '../UI/style/container'

type PropertyUpdateMessageProps = {
  children: ReactNode
  dismissCallback?: () => void
  dismissModal: () => void
}

const StyledPropertyUpdateMessage = styled(Card)`
  background: white;
  padding: 32px;
  justify-content: center;
  align-items: center;
  gap: 32px;
`

export const PropertyUpdateMessage = ({
  children,
  dismissCallback,
  dismissModal
}: PropertyUpdateMessageProps) => {
  return (
    <StyledPropertyUpdateMessage>
      {children}
      <Container direction="row">
        <IconButton width="unset" onClick={dismissModal}>{`${dismissCallback ? 'cancelar' : 'Aceptar'}`}</IconButton>
        {dismissCallback && <IconButton width="unset" onClick={dismissCallback}>Aceptar</IconButton>}
      </Container>
    </StyledPropertyUpdateMessage>
  )
}
