import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { getColor } from '../../utils/theme'
import { Container, Image, Text } from '../ui'
import { IoMenu, IoClose } from 'react-icons/io5'

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
      background: transparent;
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
            font-size: 14px;
            letter-spacing: 6px;
            text-decoration: none;
            transition: all ease-in-out .3s;
          }
          &.active a {
            transform: scale(1.25);
          }
        }
      }
    }
    @media (max-width: 1024px) {
      width: 100%;
      z-index: 5;
      position: fixed;
      top: 0;
      .main-nav-bar {
        transition: ease-in-out .3s all;
        * {
          transition: ease-in-out .3s all;
        }
        .mobile-burger-menu {
          background: ${getColor('primary')};
          z-index: 6;
          align-items: center;
        }
        height: 42px;
        ul {
          padding: 16px;
          flex-direction: column;
          transform: translateY(-100%);
          opacity: 0;
          li {
            max-width: unset;
            padding: 8px 8px;
          }
        }
        &.open {
          ul {
            transform: translateY(0);
            opacity: 1;
          }
          height: 222px;
        }
        svg {
          color: ${getColor('white')};
          font-size: 40px;
        }
      }
    }
  }
  &.home {
    top: -100%;
    nav {
      @media (min-width: 1025px) {
        display: flex;
      }
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
  @media (min-width: 1025px) {
    .hide-on-desktop {
      display: none!important;
    }
  }
`

const logo = "https://firebasestorage.googleapis.com/v0/b/yucatan-north-web.appspot.com/o/web%20assets%2Flogo.png?alt=media&token=9b53218e-20ec-4599-816e-08db21838a18"
const logoHorizontal = "https://firebasestorage.googleapis.com/v0/b/yucatan-north-web.appspot.com/o/web%20assets%2Flogo_horizontal.png?alt=media&token=44f9817a-a143-4570-a708-ae785db6c781"
const videoBackground = 'https://firebasestorage.googleapis.com/v0/b/yucatan-north-web.appspot.com/o/web%20assets%2Fvideobackground.webm?alt=media&token=cd4d3492-8014-4ca7-ab55-e0df733e4492'
const videoBackgroundIphone = 'https://firebasestorage.googleapis.com/v0/b/yucatan-north-web.appspot.com/o/web%20assets%2Fiphone.mp4?alt=media&token=91013a09-c8db-4f54-9a1b-96b2e1d56a23'
export const Header = () => {
  const {pathname, push} = useRouter()
  const isHome = pathname === '/'
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)

  const renderCover = () => {
    return (
      <Container className='cover-container'>
        <video className='background-video' autoPlay muted loop id="myVideo">
          <source src={videoBackground} type="video/webm" />
          <source src={videoBackgroundIphone} type="video/mp4" />
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
            {/* <li onClick={() => push('/saved')} >
              <a href="#"> ELEGIDOS </a>
            </li> */}
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
            ESPECIALISTAS EN INVERSIONES INMOBILIARIAS
          </Text>
        </Container>
      </Container>
    )
  }

  return (
    <StyledHeader className={isHome ? 'home' : ''}>
      {renderCover()}
      <Container className='menu-container'>
        <nav className={`main-nav-bar ${mobileMenuVisible ? 'open' : 'closed'}`}>
          { mobileMenuVisible 
            ? (
              <Container className='hide-on-desktop mobile-burger-menu' onClick={() => setMobileMenuVisible(false)}>
                <IoClose />
              </Container>
            ) : (
              <Container className='hide-on-desktop mobile-burger-menu' onClick={() => setMobileMenuVisible(true)}>
                <IoMenu />
              </Container>
            )
          }
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
            {/* <li onClick={() => push('/saved')} className={`${pathname === '/saved' ? 'active' : ''}`}>
              <a href="#"> FAVORITOS </a>
            </li> */}
          </ul>
        </nav>
      </Container>
    </StyledHeader>
  )
}

export default Header