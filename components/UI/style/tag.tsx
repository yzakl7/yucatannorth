import styled from '@emotion/styled'
import React from 'react'
import { ReactNode } from 'react'

type TagProps = {
  children: ReactNode
}

const StyledTag = styled.span`
  border: 1px solid;
  border-radius: 3px;
  flex-direction: row;
  display: flex;
  gap: 4px;
  padding: 4px 8px;
`


export const Tag = ({children}: TagProps) => {
  return (
    <StyledTag>
      {children}
    </StyledTag>
  )
}
