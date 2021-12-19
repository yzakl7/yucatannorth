import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { ReactNode } from 'react'
import { Image } from '../style/image'

export interface IconButtonProps {
  height?: string,
  width?: string,
  alt?: string,
  src?: { src: string } | string,
  background?: string,
  roundBorder?: boolean,
  children?: ReactNode,
  onClick?: () => void
}

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
    border: 1px solid;
  }
`

export const IconButton = ({
  height="30px",
  width="30px",
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
