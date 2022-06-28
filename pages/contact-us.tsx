import React from 'react'
import styled from 'styled-components'
import { ContactForm, Map } from '../components/layout'
import { Container, Image, Text } from '../components/ui'

const StyledAboutUs = styled(Container)`
  padding: 64px;
  gap: 54px;
`


export const AboutUs = () => {
  return (
    <StyledAboutUs className='about-us-container' gap='54px'>
      <ContactForm />
      <Map />
    </StyledAboutUs>
  )
}
export default AboutUs  