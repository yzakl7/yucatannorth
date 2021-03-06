import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SlidesType } from '../../properties/types';
import Container from './container';
import { Image } from './image';
import { Text } from './text';


export interface SlideShowProps {
  data: SlidesType[]
  title?: string
}



const StyledSlideShow = styled(Container)`
  flex: 1;
  gap: 0;
  h4 {
    color: white;
    text-shadow: 2px 0px 3px rgba(0, 0, 0, 0.75);
    font-size: 18px;
    line-height: 22px;
    font-weight: 600;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .slider-container {
    height: 300px;
    position: relative;
    .image-frame {
      flex: 1;
      height: 100%;
      overflow: hidden;
      .image-motion {
        flex-direction: column;
        min-width: 100%;
        &.translate-left {
          transition: all ease-in-out .5s;
          transform: translateX(-100%);
        }
        &.translate-right {
          transition: all ease-in-out .5s;
          transform: translateX(100%);
        }
        .image-container {
          img {
            object-fit: cover;
            height: 100%;
          }
        }
      }
    }
    .buttons-container {
      z-index: 3;
      position: absolute;
      height: 100%;
      width: 100%;
      justify-content: space-between;
      button {
        display: flex;
        border: none;
        background: rgb(2,0,36);
        background: linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.20) 35%, rgba(0,0,0,0) 100%);
        &:nth-of-type(2) {
          background: linear-gradient(270deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0) 100%);
        }
        width: 60px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        svg {
          color: white;
          font-weight: bolder;
          transform: scale(4);
        }
      }
    }
    .bullets-container {
      z-index: 3 ;
      position: absolute;
      width: 100%;
      gap: 9px;
      justify-content: center;
      bottom: 34px;
      .bullet {
        cursor: pointer;
        height: 12px;
        box-shadow: 0px 0px 3px 2px rgba(150,150,150,0.5);

        border-radius: 50%;
        width: 12px;
        background: white;
        transition: all ease-in-out .3s;
        opacity: 0.38;
        &.active {
          opacity: 1;
        }
      }
    }
  }
  .slide-body-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 1;
    background: rgb(2,0,36);
    background: linear-gradient(0deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.40) 35%, rgba(0,0,0,0) 100%);
    padding: 15px 44px 15px 44px;
    gap: 0;
    .slide-body {
      min-width: 100%;
      &.current{
        &.transitioning {
          transition: all ease-in-out .3s;
          opacity: 0;
        }
      }
      &.next {
        opacity: 0;
        transform: translateX(-100%);
        &.transitioning {
          transition: all ease-in-out .3s;
          opacity: 1;
        }
      }
      flex-direction: column;
    }
  }
  @media (max-width: 720px) {
    h3 {
      line-height: 34px;
    }
    p {
      line-height: 22px;
    }
    .slider-container {
      max-height: 100%;
      .buttons-container {
        button {
          width: 21px;
          svg {
            transform: scale(3);
          } 
        }
      }
    }
    .slide-body-container {
      padding: 13px 13px 21px 13px;
    }
  }
`


export const SlideShow = (props: SlideShowProps) => {
  let slides: SlidesType[]
  slides = props.data

  const [selectedSlide, setSelectedSlide] = useState(0)
  const [selectedSlideData, setSelectedSlideData] = useState(slides[0])
  const [nextSlideData, setNextSlideData] = useState(0)
  const [selectedtSlideClass, setSelectedSlideClass] = useState("")
  const [nextSlideClass, setNextSlideClass] = useState("")
  const [direction, setDirection] = useState("")

  const maxSlides = slides.length
  const lastSlide = maxSlides - 1

  const nextSlide = (direction: string, overrideNextSlideIndex?:number) => {
    const row = selectedSlide === lastSlide ? 0 : selectedSlide + 1
    const reverse = selectedSlide === 0 ? lastSlide : selectedSlide - 1
    const nextSlide = direction === 'row' ? row : reverse
    const translate = direction === 'row' ? "translate-left" : "translate-right"
    const nextSlideIndex = overrideNextSlideIndex !== undefined ? overrideNextSlideIndex : nextSlide
    setDirection(direction)
    setNextSlideData((slides as any)[nextSlideIndex])
    setSelectedSlideClass(translate)
    setNextSlideClass(translate)
    setTimeout(() => setSelectedSlide(nextSlideIndex), 500);
  }

  useEffect(() => {
    const data = slides[selectedSlide]
    setSelectedSlideData(data)
    setSelectedSlideClass("")
    setNextSlideClass("")
  }, [selectedSlide])

  const next = () => {
    if (!selectedtSlideClass) {
      nextSlide('row')
    }
  }

  const prev = () => {
    if (!selectedtSlideClass) {
      nextSlide('row-reverse')
    }
  }

  const renderBullets = () => {
    const bulletOnclick = (i:number) => {
      if (i !== selectedSlide) {
        const direction = selectedSlide > i ? 'row-reverse' : 'row'
        nextSlide(direction, i)
      }
    }
    if (slides.length < 1) {
      return slides.map(({slideCaption}, i) => {
        return (
          <div
            onClick={() => bulletOnclick(i)}
            className={`bullet ${ i === selectedSlide ? 'active' : ''}`}
            key={`bulletindex${slideCaption}`}
          />
        )
      })
    }
    return <></>
  }

  return (
    <StyledSlideShow direction="column" className="slide-show-container">
      <Text textType="h3">{props.title}</Text>
      <Container className="slider-container">

        <Container className="image-frame" direction={direction || 'row'}>
          <Container className={`image-motion ${selectedtSlideClass}`}>
            <Image src={selectedSlideData.slideImage.asset} alt={selectedSlideData.slideImage.alt} />
          </Container>
            { nextSlideData && (
              <Container className={`image-motion ${nextSlideClass}`}>
                <Image src={(nextSlideData as any).slideImage.asset} alt={selectedSlideData.slideImage.alt} />
              </Container>
            ) }
        </Container>

        {slides.length > 1 && <Container className="buttons-container" direction="row">
          <button onClick={prev}>
            <IoIosArrowBack />
          </button>
          <button onClick={next}>
            <IoIosArrowForward />
          </button>
        </Container>}
        <Container className="bullets-container" direction="row">
          {renderBullets()}
        </Container>

      </Container>
      <Container className="slide-body-container" direction="row">
        <Container className={`slide-body current ${selectedtSlideClass ? 'transitioning' : ''}`} gap="0">
          <Text textType="h4">
            -{selectedSlideData.slideCaption}
          </Text>
        </Container>
        { nextSlideData && (
          <Container className={`slide-body next ${selectedtSlideClass ? 'transitioning' : ''}`} gap="0">
            <Text textType="h4">
              -{(nextSlideData as any).slideCaption}
            </Text>
          </Container>
        ) }
      </Container>
    </StyledSlideShow>
  )
}

export default SlideShow
