import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { ContainerProps } from '../typings'

const StyledContainer = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  ${({ direction }: ContainerProps ) =>
    direction &&
    css`
      flex-direction: ${direction};
    `}
  ${({ zIndex }: ContainerProps ) =>
    zIndex &&
    css`
      z-index: ${zIndex};
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
  const { REF, children } = props
  return (
    <StyledContainer ref={REF} {...props}>
      {children}
    </StyledContainer>
  )
}

export default Container
