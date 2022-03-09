import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React from 'react'
import { getColor } from '../../utils/theme'
import { Container, Image, Text } from '../ui'
import coverImage from '../../public/playa.jpg'

const StyledHeader = styled(Container)`
  gap: 0;
  position: sticky;
  z-index: 10;
  top:-185px;
  
  .cover-container {
    max-height: 185px;
    order: 2;
    gap: 64px;
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
    .image-container {
      position: absolute;
      height: 100%;
      top:0;
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
    }
    .yucatan-north-slogan {
      flex: 1;
      text-align: center;
      h1 {
        display: none;
        color: ${getColor('white')};
        font-size: 22px;
        letter-spacing: 12px;
        background: rgba(0,0,0,.15);
        padding: 4px;
        text-shadow: 0px 2px 8px rgba(0, 0, 0, .7);
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
        li {
          flex: 1;
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
      h1 {
        display: block;
      }
      .yucatan-north-slogan {
        padding-bottom: 100px;

      }
    }
  }
`

export const Header = () => {
  const {pathname} = useRouter()
  const isHome = pathname === '/'

  const renderCover = () => {
    return (
      <Container className='cover-container'>
        <Image src={coverImage} alt="playa" />
        <nav>
          <ul>
            <li>
              <a href="#"> PROPIEDADES </a>
            </li>
            <li>
              <a href="#"> INVERSIONES </a>
            </li>
            <li>
              <a href="#"> NOSOTROS </a>
            </li>
            <li>
              <a href="#"> CONTACTO </a>
            </li>
            <li>
              <a href="#"> ELEGIDOS </a>
            </li>
          </ul>
        </nav>
        <Container className='yucatan-north-logo'>
          <Text textType='h3'>
            YUCATAN
          </Text>
          <Text textType='h3'>
            NORTH
          </Text>
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
            <li className={`${pathname === '/' ? 'active' : ''}`}>
              <a href="#"> PROPIEDADES </a>
            </li>
            <li className={`${pathname === '/investments' ? 'active' : ''}`}>
              <a href="#"> INVERSIONES </a>
            </li>
            <li className={`${pathname === '/about' ? 'active' : ''}`}>
              <a href="#"> NOSOTROS </a>
            </li>
            <li className={`${pathname === '/contact' ? 'active' : ''}`}>
              <a href="#"> CONTACTO </a>
            </li>
            <li className={`${pathname === '/selected' ? 'active' : ''}`}>
              <a href="#"> ELEGIDOS </a>
            </li>
          </ul>
        </nav>
      </Container>
    </StyledHeader>
  )
}

export default Header