import React from 'react'
import Container from '../UI/style/container'
import styled from '@emotion/styled'
import { PropertyProps } from './types'

const StyledPropertyListRow = styled(Container)`
  flex-direction: row;
`

type PropertyListRowProps = {
  data: PropertyProps
}

export const PropertyListRow = ({ data }: PropertyListRowProps) => {
  return (
    <StyledPropertyListRow>
      {JSON.stringify(data)}
    </StyledPropertyListRow>
  )
}
