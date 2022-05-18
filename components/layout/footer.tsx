import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React from 'react'
import { getColor } from '../../utils/theme'
import { Container, Image, Text } from '../ui'
import coverImage from '../../public/playa.jpg'
import { Button, IconButton } from '../inputs'
import { BsWhatsapp, BsFacebook, BsYoutube   } from 'react-icons/bs'

const StyledFooter = styled(Container)`
  flex-direction: column;
    gap: 16px;
  p {
    color: ${getColor('white')};
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    @media (max-width: 720px) {
      font-size: 18px;
      line-height: 24px;
    }
  }
  svg {
    color: ${getColor('primary')};
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
  .bottom-container {
    background: ${getColor('primary')};
      padding: 16px 0;
    .links-bottom-container {
      flex-wrap: wrap;
      flex-direction: row;
  
      justify-content: space-between;
      * {
        flex: 1;
      }
    }
    .direction-container {
      p {
        text-align: center;
      }
    }
  }
`

export const Footer = () => {
  const {push} = useRouter()
  return (
    <StyledFooter>
      <Container className='social-media-container'>
        <IconButton onClick={() => push('https://wa.link/tgnevv')}>
          <BsWhatsapp />
        </IconButton>
        <IconButton>
          <BsYoutube onClick={() => push('https://www.youtube.com/channel/UCC0Uqo5sRFSCPuHQd_7VJ1Q')}/>
        </IconButton>
        <IconButton>
          <BsFacebook onClick={() => push('https://www.facebook.com/RefSolis2018')}/>
        </IconButton>
      </Container>
      <Container className='bottom-container'>
        <Container  className='links-bottom-container'>
          <Button action={() => push('/contact-us')} buttonStyle='link'><Text textType='p'>refaccionessolis@gmail.com</Text></Button>
          <Button buttonStyle='link'><Text textType='p'>Copyright © 2022</Text></Button>
          <Button action={() => push('/privacy')} buttonStyle='link'><Text textType='p'>Políticas de privacidad</Text></Button>
        </Container>
        <Container className='direction-container'>
          <Text textType='p'>Calle 65 No. 284 por 30 y 32 Centro CP 97000 Mérida, Yuc.</Text>
        </Container>
        <Container align='center' onClick={() => push('/admin')} >
          <Text textType='p'>Admin</Text>
        </Container>
      </Container>
    </StyledFooter>
  )
}

export default Footer