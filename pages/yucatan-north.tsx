import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { getLandingCoverImage } from '../components/api/firebaseAPI'
import { ContactForm, Map } from '../components/layout'
import { Container, Image } from '../components/ui'

const StyledLandingPage = styled(Container)`
  gap: 64px;
  padding: 32px;
  .image-container {
    max-height: 650px;
  }
`

const Landing = () => {

  const [landingCoverImageState, setlandingCoverImageState] = useState<string>()

  const getCurrentLandingCoverImage = async () => {
    const landingImage = await getLandingCoverImage()
    setlandingCoverImageState(landingImage)
  }

  useEffect(() => {
    getCurrentLandingCoverImage()
  }, [])
  
  return (
    <StyledLandingPage>
      <Image src={landingCoverImageState} alt='cover image' />
      <ContactForm />
      <Map />
    </StyledLandingPage>
  )
}

export default Landing