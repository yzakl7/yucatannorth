import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React from 'react'
import { getColor } from '../../utils/theme'
import { Container, Image, Text } from '../ui'
import coverImage from '../../public/playa.jpg'
import { Button, IconButton } from '../inputs'
import { BsWhatsapp, BsFacebook } from 'react-icons/bs'

const StyledFooter = styled(Container)`
  flex-direction: column;
  gap: 0;
  * {
    color: ${getColor('primary')}
  }

  button {
    background: transparent;
  }
  
  .social-media-container {
    flex-direction: row;
    gap: 8px;
    justify-content: center;
    svg {
      height: 45px;
      width: 45px;
    } 
  }
  .links-bottom-container {
    flex-wrap: wrap;
    flex-direction: row;
    padding: 16px 0;

    justify-content: space-between;
    * {
      font-size: 16px;
      flex: 1;
    }
  }
`

export const Footer = () => {
  const {push} = useRouter()
  return (
    <StyledFooter>
      <Container className='social-media-container'>
        <IconButton onClick={() => push('https://wa.link/h9k9rq')}>
          <BsWhatsapp />
        </IconButton>
        <IconButton>
          <BsFacebook onClick={() => push('https://www.facebook.com/yucatannorth')}/>
        </IconButton>
      </Container>
      <Container className='links-bottom-container'>
        <Button action={() => push('/contact-us')} buttonStyle='link'><Text textType='p'>fdobfajardo@gmail.com</Text></Button>
        <Button buttonStyle='link'><Text textType='p'>Copyright 2022 Yucatán North</Text></Button>
        <Button buttonStyle='link'><Text textType='p'>Políticas de privacidad</Text></Button>
      </Container>
      <Container align="center">
        <Button action={() => push('/admin')} buttonStyle='link'><Text textType='p'>Admin</Text></Button>
      </Container>
    </StyledFooter>
  )
}

export default Footer