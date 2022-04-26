import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getLandingCoverImage, getLandingPDF } from '../components/api/firebaseAPI'
import { Button } from '../components/inputs'
import { ContactForm, Map } from '../components/layout'
import { Container, Image, Text } from '../components/ui'
import { getColor } from '../utils/theme'

const StyledLandingPage = styled(Container)`
  gap: 64px;
  padding: 32px;
  .image-container {
    max-height: 650px;
  }
  button.custom {
    border: 1px solid;
    height: 40px;
    color: ${getColor('white')};
    background: ${getColor('success')};
    border-radius: 5px;
    &.disabled {
      background: ${getColor('border')};
    }
  }
`

const Landing = () => {

  const [landingCoverImageState, setlandingCoverImageState] = useState<string>()
  const [landingPDFState, setlandingPDFState] = useState<string>()

  const { push } = useRouter()

  const getCurrentLandingCoverImage = async () => {
    const landingImage = await getLandingCoverImage()
    setlandingCoverImageState(landingImage)
  }

    const getCurrentLandingPDF = async () => {
    const PDF = await getLandingPDF()
    setlandingPDFState(PDF)
  }

  const downloadPDF = () => {
    push(`${landingPDFState}`)
  }

  useEffect(() => {
    getCurrentLandingCoverImage()
    getCurrentLandingPDF()
  }, [])
  
  return (
    <StyledLandingPage>
      <Image src={landingCoverImageState} alt='cover image' />

      <Container align='center'>
        <Button action={downloadPDF} buttonStyle='custom'>
          <Text textType='p'>
            Descargar PDF
          </Text>
        </Button>
      </Container>
      <ContactForm />
      <Map />
    </StyledLandingPage>
  )
}

export default Landing