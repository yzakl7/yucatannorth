
import styled, { css } from 'styled-components'
import { Container, Image } from '../ui'
import { IconButtonProps } from '../typings'
import { getColor } from '../../utils/theme'

const StyledIconButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 6px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({height}: IconButtonProps) => height};
  width: ${({width}: IconButtonProps) => width};
  ${({roundBorder}: IconButtonProps) => roundBorder && css`border-radius: 50%;`}
  ${({background}: IconButtonProps) => background && css`background: ${background};`}
  &:hover {
    transform: translateY(1px);
  }
  .tooltip {
    position: absolute;
    background: rgba(0 ,0 ,0 ,0.75);
    top: calc(100% + 4px);
    display: none;
    padding: 4px;
      color: ${getColor('white')};
    }
  &:hover {
    .tooltip {
      display: flex;
    }
  }
`

export const IconButton = ({
  height,
  width,
  roundBorder,
  background,
  children,
  tooltip,
  alt = "",
  src,
  onClick,
}: IconButtonProps) => {
  return (
    <StyledIconButton
      src={src}
      height={height}
      width={width}
      roundBorder={roundBorder}
      background={background}
      onClick={onClick}
    >
      {src && <Image src={src} alt={alt} />}
      {children}
      {tooltip && <Container className="tooltip">{tooltip}</Container>}
    </StyledIconButton>
  )
}

export default IconButton
