import React, { useEffect, useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'
import styled from 'styled-components'
import { hooks, settingsOperations, settingsSelectors } from '../../state'
import { getColor } from '../../utils/theme'
import { Button } from '../inputs'
import { Container, Image, Text } from '../ui'

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
  .nav-arrow {
    position: absolute;
    top: 50%;
    &.left {
      left: 25px;
      z-index: 25;
    }
    &.right {
      right: 25px;
      z-index: 25;
    }
    font-size: 64px;
    color: ${getColor('white')};
  }
`

const Slides = () => {
  const { useAppSelector, useAppDispatch } = hooks
  const { selectSettings } = settingsSelectors
  const { getSlides } = settingsOperations
  const { slideList } = useAppSelector(selectSettings)

  const [firstSlide, setFirstSlide] = useState<string>('left')
  const [secondSlide, setSecondSlide] = useState<string>('focus')
  const [thirdSlide, setThirdSlide] = useState<string>('right')
  const [selectedSlide, setselectedSlide] = useState<any>()
  const [focusedSlide, setFocusedSlide] = useState<any>(1)

  const dispatch = useAppDispatch()

  const onNavigateSlides = (move:number) => {
    const action = [onFirstSlideClick, onSecondSlideClick, onThirdSlideClick]
    setselectedSlide(undefined)

    if (focusedSlide + move === 3) {
      return action[0]()
    }
    if (focusedSlide + move === -1) {
      return action[2]()
    }
  
    return action[focusedSlide + move]()
  }

  const onFirstSlideClick = () => {
    if ( firstSlide !== 'focus') {
      setFirstSlide('focus')
      setSecondSlide('right')
      setThirdSlide('left')
      setFocusedSlide(0)
    } else {
      setselectedSlide(0)
    }
  }
  const onSecondSlideClick = () => {
    if (secondSlide !== 'focus') {
      setFirstSlide('left')
      setSecondSlide('focus')
      setThirdSlide('right')
      setFocusedSlide(1)
    } else {
      setselectedSlide(1)
    }
  }
  const onThirdSlideClick = () => {
    if (thirdSlide !== 'focus') {
      setFirstSlide('right')
      setSecondSlide('left')
      setThirdSlide('focus')
      setFocusedSlide(2)
    } else {
      setselectedSlide(2)
    }
  }

  useEffect(() => {
    if (slideList.length < 1) {
      dispatch(getSlides())
    }
  }, [dispatch, getSlides, slideList.length])
  

  return (
    <StyledSlides>
      {focusedSlide}
      <Container className='nav-arrow left' onClick={() => onNavigateSlides(-1)}>
        <Text textType='p'><BiChevronLeft /></Text>
      </Container>
      <Container className='nav-arrow right' onClick={() => onNavigateSlides(1)}>
        <Text textType='p'><BiChevronRight /></Text>
      </Container>
      <Container className={`slide ${firstSlide}`} onClick={onFirstSlideClick}>
        <Image alt="¡promociones!" src={slideList[0]?.url} />
      </Container>
      <Container className={`slide ${secondSlide}`} onClick={onSecondSlideClick}>
        <Image alt="¡promociones!" src={slideList[1]?.url} />
      </Container>
      <Container className={`slide ${thirdSlide}`} onClick={onThirdSlideClick}>
        <Image alt="¡promociones!" src={slideList[2]?.url} />
      </Container>
      {selectedSlide !== undefined && <Container className='fullscreen'>
        <Container className='background-area' />

        <Button action={() => setselectedSlide(undefined)}>
          <IoClose />
        </Button>
        <Image alt="preview image" src={slideList[selectedSlide]?.url} />
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