import styled from '@emotion/styled'
import React from 'react'
import { getColor } from '../../utils/theme'
import { Container, Image, Text } from '../ui'

const StyledAboutCard = styled(Container)`
  overflow: hidden;
  width: calc(50% - 32px);
  border-radius: 20px;
  gap: 0;
  @media (max-width: 720px) {
    width: 100%;
  }
  h3, h4, p {
    text-align: center;
    padding: 0 32px;
  }
  .header-container {
    height: 300px;
  }
  .text-container {
    h4 {
      background: ${getColor('primary')};
      color: ${getColor('white')};
      font-size: 32px;
      padding: 32px;
    }
    h3 {
      font-size: 36px;
      padding: 16px 32px;
      color: ${getColor('primary')};
    }
    p {
      color: ${getColor('dark')};
      font-size: 24px;
      line-height: 32px;
    }
  }
  img {
    object-fit: cover;
    height: 100%;
  }
`

export const AboutCard = ({title, subtitle, description, image}: Record<string, string>) => {
  return (
    <StyledAboutCard>
      <Container className='header-container' height='350px'>
        <Image src={image} alt={title} />
      </Container>
      <Container className='body-container'>
        <Text textType='h4'>{title}</Text>
        <Text textType='h3'>{subtitle}</Text>
        <Text textType='p'>{description}</Text>
      </Container>
    </StyledAboutCard>
  )
}

export default AboutCard