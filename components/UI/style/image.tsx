import { css } from '@emotion/react';
import styled from '@emotion/styled'

export type ImageType = {
  alt: string,
  asset?: ImageProps,
  onClick?: () => void
}

type SrcType = {
  src:string
}

export interface ImageProps {
  width?: string,
  src?: SrcType | string,
  alt: string,
  sanitySrc?: ImageProps,
  url?: string,
  onClick?: () => void
}

const StyledImage = styled.div`
width: 100%;
height: 100%;
position: relative;
display: flex;
overflow: hidden;
justify-content: center;
img {
  object-fit: contain;
  width: 100%;
}
${({onClick}) => onClick && css`cursor: pointer`}
`

export const Image = ({src, alt, onClick }: ImageProps) => {
  let sourceImage = ''

  if (src) {
    if (typeof src === 'string') {
      sourceImage = src 
    } else {
      sourceImage = src.src
    }
  }
  
  return (
    <StyledImage className="image-container" onClick={onClick}>
      {(src) && <img src={sourceImage} alt={alt}/>}
    </StyledImage>
  )
}