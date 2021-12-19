import styled from '@emotion/styled'
import React from 'react'
import { ReactNode } from 'react'
import Container from './container'

type FileIconProps = {
  icon: ReactNode
  label: string
  onClick?: () => void
}

const StyledFileIcon = styled(Container)`
  align-items: center;
  justify-content: center;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  svg {
    font-size: 64px;
  }
  padding: 4px;
  p {
    max-width: 100%;
    overflow: hidden;
    flex: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const FileIcon = ({icon, label, onClick}: FileIconProps) => {
  return (
    <StyledFileIcon onClick={onClick}>
      {icon}
      <p>{label}</p>
    </StyledFileIcon>
  )
}
