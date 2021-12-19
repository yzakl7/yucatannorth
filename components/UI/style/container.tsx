import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode, RefObject } from 'react'

export interface ContainerProps {
  padding?: string
  maxWidth?: string
  minWidth?: string
  flex?: string
  direction?: string
  gap?: string
  height?: string
  align?: string
  justify?: string
  wrap?: string
  background?: string
  children?: ReactNode
  className?: string
  onClick?: (e?: React.MouseEvent<HTMLElement> ) => void
  type?: string,
  REF?: RefObject<HTMLInputElement>
}

const StyledContainer = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  ${({ direction }: ContainerProps) =>
    direction &&
    css`
      flex-direction: ${direction};
    `}
  ${({ padding }: ContainerProps) =>
    padding &&
    css`
      padding: ${padding};
    `}
  ${({ maxWidth }: ContainerProps) =>
    maxWidth &&
    css`
      max-width: ${maxWidth};
      width: 100%;
    `}
  ${({ minWidth }: ContainerProps) =>
    minWidth &&
    css`
      min-width: ${minWidth};
      width: 100%;
    `}
  ${({ flex }: ContainerProps) =>
    flex &&
    css`
      flex: ${flex};
    `}
  ${({ gap }: ContainerProps) =>
    gap
      ? css`
          gap: ${gap};
        `
      : css`
          gap: 4px;
        `}
  ${({ height }: ContainerProps) =>
    height &&
    css`
      height: ${height};
    `}
  ${({ align }: ContainerProps) =>
    align &&
    css`
      align-items: ${align};
    `}
  ${({ justify }: ContainerProps) =>
    justify &&
    css`
      justify-content: ${justify};
    `}
  ${({ wrap }: ContainerProps) =>
    wrap &&
    css`
      flex-wrap: ${wrap};
    `}
  ${({ background }: ContainerProps) =>
    background &&
    css`
      background: ${background};
    `}
  ${({ onClick }: ContainerProps) =>
    onClick &&
    css`
      cursor: pointer;
    `}
`

export const Container = (props: ContainerProps) => {
  const { className, onClick, REF } = props
  return (
    <StyledContainer ref={REF} className={className} onClick={onClick} {...props}>
      {props.children}
    </StyledContainer>
  )
}

export default Container
