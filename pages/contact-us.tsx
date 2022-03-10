import styled from '@emotion/styled'
import React from 'react'
import { ContactForm, Map } from '../components/layout'
import { Container } from '../components/ui'

const StyledContactUs = styled(Container)`
  gap: 64px;
  padding: 32px;
  .about-cards-container {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 64px;
  }
`

const about = () => {
  return (
    <StyledContactUs>
      <ContactForm />
      <Map />
    </StyledContactUs>
  )
}

export default about