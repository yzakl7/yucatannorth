import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import styled from 'styled-components'
import { getColor } from '../../utils/theme'
import { Button } from '../inputs'
import { Container, Image, Text } from '../ui'

const slide1 = 'https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fslide_1.png?alt=media&token=8dfba154-3070-4500-8e72-3c7f2528b7e6'
const slide2 = 'https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fslide_2.png?alt=media&token=655cc9dc-c787-4ee1-83c7-e39450e19c31'
const slide3 = 'https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Fslide_1.png?alt=media&token=8dfba154-3070-4500-8e72-3c7f2528b7e6'

const StyledEventsAndPromotions = styled(Container)`
  align-items: center;
  .title-container {
    gap: 32px;
    h3 {
      color: ${getColor('primary')};
      text-align: center;
      font-weight: 700;
      font-size: 36px;
      line-height: 54px;
      @media (max-width: 720px) {
        font-size: 28px;
        line-height: 34px;
      }
    }
  }
`

const StyledSlides = styled(Container)`
  width: 100%;
  overflow: hidden;
  flex-direction: row;
  justify-content: center;
  .image-container:nth-of-type(1) {

  }
  height: calc(100vh - 150px);
  position: relative;
  max-width: 850px;
  @media (max-width: 720px) {
    max-height: 50vh;
  }
  .slide {
    min-width: 215px;
    max-width: 55vw;
    img {
      object-fit: contain;
      height: 100%
    }
    transition: all ease-in-out .3s;
    position: absolute;
    height: 100%;
    &.focus {
      transform: unset;
      z-index: 10;
    }
    &.left, &.right {
      filter: blur(4px) brightness(65%);
    }
    &.left {
      transform: scale(0.75) translateX(-85%);
      z-index: 1;
    }
    &.right {
      z-index: 1;
      transform: scale(0.75) translateX(85%);

    }
  }

  .fullscreen {
    gap: 0;
    position: fixed;
    z-index: 20;
    width: 100%;
    top: 0;
    height: 100%;
    img {
      height: 100%;
    }
    button {
      position: absolute;
      z-index: 5;
      right: 0;
      background: none;
      border: none;
      svg {
        font-size: 32px;
        color: ${getColor('white')};
      }
    }
    .clickable-area {
      position: fixed;
      height: 100%;
      z-index: 5;
      width: 100%;
    }
    .background-area {
      position: fixed;
      height: 100%;
      width: 100%;
      background: rgba(0,0,0,0.35);
    }
    img {
      z-index: 3;
    }
  }
`


const Slides = () => {

  const [firstSlide, setFirstSlide] = useState<string>('left')
  const [secondSlide, setSecondSlide] = useState<string>('focus')
  const [thirdSlide, setThirdSlide] = useState<string>('right')
  const [selectedSlide, setselectedSlide] = useState<any>()

  const onFirstSlideClick = () => {
    if ( firstSlide !== 'focus') {
      setFirstSlide('focus')
      setSecondSlide('right')
      setThirdSlide('left')
    } else {
      setselectedSlide(slide1)
    }
  }
  const onSecondSlideClick = () => {
    if (secondSlide !== 'focus') {
      setFirstSlide('left')
      setSecondSlide('focus')
      setThirdSlide('right')
    } else {
      setselectedSlide(slide2)
    }
  }
  const onThirdSlideClick = () => {
    if (thirdSlide !== 'focus') {
      setFirstSlide('right')
      setSecondSlide('left')
      setThirdSlide('focus')
    } else {
      setselectedSlide(slide3)
    }
  }
  return (
    <StyledSlides>
      <Container className={`slide ${firstSlide}`} onClick={onFirstSlideClick}>
        <Image alt="¡promociones!" src={slide1} />
      </Container>
      <Container className={`slide ${secondSlide}`} onClick={onSecondSlideClick}>
        <Image alt="¡promociones!" src={slide2} />
      </Container>
      <Container className={`slide ${thirdSlide}`} onClick={onThirdSlideClick}>
        <Image alt="¡promociones!" src={slide3} />
      </Container>
      {selectedSlide && <Container className='fullscreen'>
        <Container className='background-area' />

        <Button action={() => setselectedSlide(undefined)}>
          <IoClose />
        </Button>
        <Image alt="preview image" src={selectedSlide} />
        <Container className='clickable-area' onClick={() => setselectedSlide(undefined)} />
      </Container>}
    </StyledSlides>
  )
}

export const EventsAndPromotions = () => {
  return (
    <StyledEventsAndPromotions>
      <Container className="title-container">
        <Text textType="h3">Eventos y promociones</Text>
      </Container>
      <Slides />
    </StyledEventsAndPromotions>
  )
}

export default EventsAndPromotions