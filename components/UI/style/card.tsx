import styled from '@emotion/styled'
import React, { ReactNode } from 'react'
import Container from './container'

const StyledCard = styled(Container)`
  flex-direction: column;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.15);
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.15);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.15);
  border-radius: 3px;
  flex: 1;
  min-width: 250px;
  justify-content: center;
`

type CardProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export const Card = ({children, className, onClick}: CardProps) => {
  return (
    <StyledCard className={className} onClick={onClick}>
      {children}
    </StyledCard>
  )
}
