import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { getColor } from '../../utils/theme'
import { Container, Image, Text } from '../ui'
import { IoMenu, IoClose } from 'react-icons/io5'
import { authSelectors, hooks } from '../../state'

const StyledHeader = styled(Container)`
  gap: 0;
  z-index: 15;
  .cover-container {
    height: calc(100vh - 50px);
    align-items: center;
    justify-content: center;
    gap: 32px;
    .cover-background-container {
      width: 100%;
      height: 100%;
      position: absolute;
      img {
        object-fit: cover;
        height: 100%;
      }
    }
    .cover-logo-container {
      background: ${getColor('clearTransparency')};
      padding: 24px;
      height: 45vh;
      width: 100%;
      img {
        max-height: 100%;
        object-fit: contain;
      }
    }
    .cover-tagline-container {
      background: ${getColor('primary')};
      padding: 4px 8px;
      text-align: center;
      border-radius: 10px;
      h1 {
        font-weight: 700;
        font-size: 36px;
        line-height: 54px;
        @media (max-width: 720px) {
          font-size: 24px;
          line-height: 34px;
        }
        color: ${getColor('white')};
      }
    }
  }
  .main-nav-bar, .main-nav-bar ul, .main-nav-bar ul li {
    display: flex;
    a {
      font-weight: 700;
      font-size: 24px;
      @media (max-width: 720px) {
        font-size: 18px;
      }
    }
  }
  .menu-container {
    position: fixed;
    z-index: 5;
    width: 100%;
    top: 0;
    &.authenticated {
      top: 67px;
    }
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
            font-weight: 700;
            font-size: 24px;
            line-height: 36px;
            @media (max-width: 720px) {
              font-size: 18px;
              line-height: 24px;
            }
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
      &.authenticated {
        top: 67x;
      }
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
          height: 285px;
          @media (max-width: 720px) {
            height: 235px;
          }
        }
        svg {
          color: ${getColor('white')};
          font-size: 40px;
        }
      }
    }
  }
  
  @media (min-width: 1025px) {
    .hide-on-desktop {
      display: none!important;
    }
  }
`

const logo = "https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Frefacciones-solis-logo.png?alt=media&token=2368b436-f8fc-4b60-a0d2-4bb854471b8e"
const background = 'https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fcover-refacciones-solis.png?alt=media&token=b0d0b900-3a31-40d3-8fe8-ef400ff959c9'

export const Header = () => {
  const {pathname, push} = useRouter()
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
  const {useAppSelector} = hooks
  const { isAuthenticatedSelector } = authSelectors
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)

  const renderCover = () => {
    return (
      <Container className='cover-container'>
        <Container className='cover-background-container'>
          <Image alt={"¡Refacciones Solís!"} src={background} />
        </Container>
        <Container className='cover-logo-container'>
          <Image
            alt="refacciones solis logo"
            src={logo}
          />
        </Container>
        <Container className='cover-tagline-container'>
          <Text textType='h1'>
            “Refacciones Solís, profesionales en ajustes de motor”
          </Text>
        </Container>
      </Container>
    )
  }

  return (
    <StyledHeader>
      <Container className={`${isAuthenticated ? 'menu-container authenticated' : 'menu-container'}`}>
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
              <a href="#"> INICIO </a>
            </li>
            <li onClick={() => push('/about-us')} className={`${pathname === '/about-us' ? 'active' : ''}`}>
              <a href="#"> NOSOTROS </a>
            </li>
            <li onClick={() => push('/finder')} className={`${pathname === '/finder' ? 'active' : ''}`}>
              <a href="#"> BUSCADOR </a>
            </li>
            <li onClick={() => push('/contact-us')} className={`${pathname === '/contact-us' ? 'active' : ''}`}>
              <a href="#"> CONTACTO </a>
            </li>
          </ul>
        </nav>
      </Container>
      {renderCover()}
    </StyledHeader>
  )
}

export default Header