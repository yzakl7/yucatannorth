import styled from '@emotion/styled'
import React from 'react'
import { Card } from '../UI/style/card'
import { PropertyPreview } from './property-preview'
import { PropertyProps } from './types'

const StyledPropertyBrowser = styled.section`
  flex-wrap: wrap;
  flex-direction: row;
  align-items: stretch;
  border: 1px red;
  gap: 32px;
  padding: 16px;
`

type PropertyBrowserProps = {
  data: PropertyProps[]
}

export const PropertyBrowser = ({data}: PropertyBrowserProps) => {
  return (
    <StyledPropertyBrowser>
      {
        data.map((property:PropertyProps) => { return (
          <Card key={property.id}><PropertyPreview data={property} /></Card>
        )})
      }
    </StyledPropertyBrowser>
  )
}
