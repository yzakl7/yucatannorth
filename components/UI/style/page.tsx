import styled from '@emotion/styled'
import React, { ReactNode } from 'react'
import Container from './container'

const StyledPage = styled(Container)`
  flex: 1;
  max-width: 1440px;
  width: 100%;
  align-self: center;
  padding: 32px;
  @media(max-width: 720px) {
    padding: 16px;
  }
  @media(max-width: 425px) {
    padding: 0px;
  }
`

type PageProps = {
  children: ReactNode;
}

export const Page = ({children}: PageProps) => {
  return (
    <StyledPage className="page-container">
      {children}
    </StyledPage>
  )
}
