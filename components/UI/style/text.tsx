import styled from '@emotion/styled'
import React, { ReactNode } from 'react'
import Container from './container'

type TextProps = {
  children: ReactNode
  textType: string
}

const StyledText = styled(Container)`
  * {
    flex-direction: row;
  }
  h2 {
    font-size: 24px;
    line-height: 24px;
  }
  p {
    line-height: 24px;
  }
`

export const Text = ({ children, textType }: TextProps) => {
  const textElements: any = {
    p: <p>{children}</p>,
    h1: <h1>{children}</h1>,
    h2: <h2>{children}</h2>,
    h3: <h3>{children}</h3>,
    h4: <h4>{children}</h4>,
    h5: <h5>{children}</h5>,
    span: <span>{children}</span>,
  }
  return (
    <StyledText>
      { textElements[textType] }
    </StyledText>
  )
}
