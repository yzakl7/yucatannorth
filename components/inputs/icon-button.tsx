
import styled from "@emotion/styled"
import { Image } from '../ui'
import { IconButtonProps } from '../typings'
import { css } from "@emotion/react"

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
`

export const IconButton = ({
  height,
  width,
  roundBorder,
  background,
  children,
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
    </StyledIconButton>
  )
}

export default IconButton
