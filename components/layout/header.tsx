import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React from 'react'
import { getColor } from '../../utils/theme'
import { Container, Image, Text } from '../ui'

const StyledHeader = styled(Container)`
  gap: 0;
  position: sticky;
  z-index: 10;
  top:-150px;
  .cover-container {
    min-height: 150px;
    order: 2;
    flex: 1;
    ul {
      flex-wrap: wrap;
    }
    nav, ul, li {
      display: flex;
    }
    nav ul li a {
      font-size: 18px;
      color: ${getColor('white')};
      background: rgba(0, 0, 0, 0);
      text-decoration: none;
      text-shadow: 1px 1px 1px ${getColor('black')};
      padding: 8px;
      border-radius: 4px;
    }
    nav {
      display: none;
      padding: 32px;
      z-index: 2;
      background: linear-gradient(0deg, rgba(255,255,255,0) 0%, #00000047 50%, rgba(255,255,255,0) 100%);
    }
    li {
      justify-content: center;
      flex: 1;
    }
    .background-video {
      position: absolute;
      top -100px;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    .image-container {
      position: absolute;
      max-width: 540px;
      max-height: 540px;
      top:0;
      padding: 16px;
      img {
        object-fit: cover;
        height: 100%;
        
      }
    }
    .yucatan-north-logo {
      justify-content: flex-end;
      flex: 1;
      align-items: center;
      text-align: center; 
      h3 {
        color: ${getColor('white')};
        font-size: 102px;
        text-shadow: 2px 4px 2px rgba(0, 0, 0, .25);
        @media (max-width: 720px) {
          font-size: 72px;
          letter-spacing: unset;
        }
      }
      *:nth-of-type(2) h3 {
        font-size: 72px;
        letter-spacing: 40px;
        padding-left: 40px;
        @media (max-width: 720px) {
          font-size: 34px;
        }
      }
      .image-container {
        img {
          object-fit: contain;
          height: 100%;
        }
      }
    }
    .yucatan-north-slogan {
      display: none;
      flex: 1;
      text-align: center;
      h1 {
        color: ${getColor('white')};
        font-size: 22px;
        letter-spacing: 12px;
        padding: 4px;
        text-shadow: -2px 3px 2px rgb(0 0 0);
        @media (max-width: 720px) {
          font-size: 16px;
          letter-spacing: unset;
        }
      }
    }
  }
  .main-nav-bar, .main-nav-bar ul, .main-nav-bar ul li {
    display: flex;
  }
  .menu-container {
    position: sticky;
    top: 0;
    .main-nav-bar {
      background: ${getColor('primary')};
      ul {
        flex-wrap: wrap;
          justify-content: center;
        li {
          flex: 1;
          max-width: 250px;
          justify-content: center;
          padding: 16px 32px;
          a {
            color: ${getColor('white')};
            font-weight: 600;
            letter-spacing: 6px;
            text-decoration: none;
          }
          &.active a {
            transform: scale(1.25);
          }
        }
      }
    }
  }
  &.home {
    top: -100%;
    nav {
      display: flex;
    }
    .cover-container {
      order: 0;
      min-height: 100vh;
      .background-video {
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
      .yucatan-north-slogan {
        display: block;
      }
    }
  }
`

const logo = "https://firebasestorage.googleapis.com/v0/b/yucatan-north-web.appspot.com/o/web%20assets%2Flogo.png?alt=media&token=9b53218e-20ec-4599-816e-08db21838a18"
const logoHorizontal = "https://firebasestorage.googleapis.com/v0/b/yucatan-north-web.appspot.com/o/web%20assets%2Flogo_horizontal.png?alt=media&token=44f9817a-a143-4570-a708-ae785db6c781"
const videoBackground = 'https://firebasestorage.googleapis.com/v0/b/yucatan-north-web.appspot.com/o/web%20assets%2Fvideobackground.webm?alt=media&token=cd4d3492-8014-4ca7-ab55-e0df733e4492'
export const Header = () => {
  const {pathname, push} = useRouter()
  const isHome = pathname === '/'

  const renderCover = () => {
    return (
      <Container className='cover-container'>
        <video className='background-video' autoPlay muted loop id="myVideo">
          <source src={videoBackground} type="video/mp4" />
        </video>
        <nav>
          <ul>
            <li onClick={() => push('/')}>
              <a href="#"> PROPIEDADES </a>
            </li>
            <li onClick={() => push('/investment')}>
              <a href="#"> INVERSIONES </a>
            </li>
            <li onClick={() => push('/about')} >
              <a href="#"> NOSOTROS </a>
            </li>
            <li onClick={() => push('/contact-us')} >
              <a href="#"> CONTACTO </a>
            </li>
            <li onClick={() => push('/saved')} >
              <a href="#"> ELEGIDOS </a>
            </li>
          </ul>
        </nav>
        <Container className='yucatan-north-logo'>
          <Image
            alt="yucatan north logo"
            src={isHome ? logo : logoHorizontal}
          />
        </Container>
        <Container className='yucatan-north-slogan'>
          <Text textType='h1'>
            ESPECIALISTAS EN INVERSIONES INMOVILIARIAS
          </Text>
        </Container>
      </Container>
    )
  }

  return (
    <StyledHeader className={isHome ? 'home' : ''}>
      {renderCover()}
      <Container className='menu-container'>
        <nav className='main-nav-bar'>
          <ul>
            <li onClick={() => push('/')} className={`${pathname === '/' ? 'active' : ''}`}>
              <a href="#"> PROPIEDADES </a>
            </li>
            <li onClick={() => push('/investment')} className={`${pathname === '/investment' ? 'active' : ''}`}>
              <a href="#"> INVERSIONES </a>
            </li>
            <li onClick={() => push('/about')} className={`${pathname === '/about' ? 'active' : ''}`}>
              <a href="#"> NOSOTROS </a>
            </li>
            <li onClick={() => push('/contact-us')} className={`${pathname === '/contact-us' ? 'active' : ''}`}>
              <a href="#"> CONTACTO </a>
            </li>
            <li onClick={() => push('/saved')} className={`${pathname === '/saved' ? 'active' : ''}`}>
              <a href="#"> FAVORITOS </a>
            </li>
          </ul>
        </nav>
      </Container>
    </StyledHeader>
  )
}

export default Header