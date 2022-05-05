import { IoMdHelpCircleOutline } from 'react-icons/io'
import { useEffect, useRef, useState } from 'react'
import styled from "@emotion/styled";
import { Container, Text } from '.';
import { UseWindowDimensions } from '../hooks';
import { TooltipProps } from '../typings';
import { getColor } from '../../utils/theme';

const StyledTooltip = styled(Container)`
  position: initial;
  .tooltip {
    box-sizing: border-box;
    position: absolute;
    z-index: 2;
    background: ${getColor('secondary')};
    padding: 25px 16px;
    border-radius: 3px;
    opacity: 0;
    align-items:center;
    justify-content: center;
    transition: ease-in-out .3s .1s all;
    visibility: hidden;
    p {
      font-size: 12px;
      line-height: 16px; 
      @media (max-width: 720px) {
        font-size: 9px;
        line-height: 12px; 
      }
      text-align: center;
    }
  }
  .tooltip-trigger {
    cursor: pointer;
    align-items: center;
    justify-content: center;
    position: relative;
    &::after{
      background:  ${getColor('secondary')};
      content: '';
      transform: rotate(45deg);
      height: 8px;
      width: 8px;
      position: absolute;
      opacity: 0;
      transition: ease-in-out .3s all;
      visibility: hidden;
      border-radius: 4px;
    }
    &.bottom::after{
      top: 100%;
    }
  }
  &:hover {
    .tooltip {
      opacity: 1;
      visibility: visible;
      transition: ease-in-out .3s all;
    }
    .tooltip-trigger::after {
      transition: ease-in-out .3s .1s all;
      border-radius: 0px;
      opacity: 1;
      visibility: visible;
    }
  }
  @media (min-width: 721px) {
    align-items: center;
    justify-content: center;
    .tooltip {
      width: fit-content;
      max-width: 250px;
    }
    .tooltip-trigger {
      &.left::after{
        right: 100%;
      }
      &.right::after{
        left: 100%;
      }
      &.top::after{
        bottom: 100%;
      }
      &.bottom::after{
        top: 100%;
      }
    }
  }
  @media (max-width: 720px) {
    justify-content: flex-start;
    .tooltip {
      width: 100%;
      max-width: unset;
      left: 0;
    }
  }
`

export function Tooltip({text}: TooltipProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const triggerRef = useRef<HTMLInputElement>(null);
  const tooltipRef = useRef<HTMLInputElement>(null);

  const {width: screenWidth, height: screenHeight} = UseWindowDimensions()
  const {
    height: triggerHeight,
    right: triggerRight,
    left: triggerLeft,
    width: triggerWidth,
    bottom: triggerBottom,
    top: triggerTop,

  } = triggerRef.current?.getBoundingClientRect() || {}
  const {
    height: tooltipHeight,
    width: tooltipWidth,
  } = tooltipRef.current?.getBoundingClientRect() || {}

  const position = { transform: 'unset'};

  if ( triggerRight && triggerWidth && tooltipWidth && triggerLeft && triggerHeight && tooltipHeight && triggerBottom && triggerTop ) {
    let translateX = ''
    let translateY = ''
    if (screenWidth < 721) {
      translateY = `translateY(${triggerHeight + 5}px)`
    } else {
      const touchesRight = ((tooltipWidth / 2) + triggerRight + 150) > screenWidth
      const touchesLeft = (tooltipWidth ) > triggerLeft
      const touchesBottom = ((tooltipHeight) + triggerBottom) > screenHeight
      const touchesTop = triggerTop  < ( (tooltipHeight / 2) + 100)
      translateX = `translateX(${(tooltipWidth/2) + 15}px)`
      if (touchesRight) {
        translateX = `translateX(-${(tooltipWidth/2) + 15}px)`
      }  
      if (touchesBottom) {
        translateY = `translateY(-${(tooltipHeight/2) + 15}px)`
        translateX = `translateX(-${(tooltipWidth/2) - 15}px)`
        if (!touchesRight) {
          translateX = `translateX(0px)`
        } 
        if(touchesLeft) {
          translateX = `translateX(${(tooltipWidth/2) - 15}px)`
        } 
      }
      if (touchesTop) {
        translateY = ` translateY(${(tooltipHeight/2) + 15}px)`
        translateX = `translateX(-${(tooltipWidth/2) - 15}px)`
        if (!touchesRight) {
          translateX = `translateX(0px)`
        } 
        if(touchesLeft) {
          translateX = `translateX(${(tooltipWidth/2) - 15}px)`
        } 
      } 

    }

    position.transform = `${translateY} ${translateX}`
  }


  const onScroll = () => {
      const scroll =  window.pageYOffset
      setScrollPosition(scroll)
  }
  
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <StyledTooltip>
      <Container className={`tooltip-trigger`} REF={triggerRef}>
        <IoMdHelpCircleOutline  />
      </Container>
      <div
        style={position}
        ref={tooltipRef}
        className="tooltip"
      >
        <Text textType='p'>{text}</Text>
      </div>

    </StyledTooltip>
  )
}

export default Tooltip
