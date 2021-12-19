import styled from '@emotion/styled'
import React, { useContext } from 'react'
import Container from '../UI/style/container'
import { Tag } from '../UI/style/tag'
import { PropertyProps } from './types'
import { FaVectorSquare } from 'react-icons/fa'
import { RiHomeSmile2Line } from 'react-icons/ri'
import { formatter } from '../../utils/formatter'
import { useRouter } from 'next/router'
import { LangContext } from '../../utils/lang/langContext'
import { PropertyTags } from './property-tags'
import { Text } from '../UI/style/text'
import SlideShow from '../UI/style/slide-show'

const StyledPropertyPreview = styled.article`
  flex-direction: column;
  cursor: pointer;
  flex: 1;
  .property-container {
    flex-direction: column;
    &.bottom {
      padding: 16px;
      background: white;
      flex: 1;
      gap: 8px;
      .description-container {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 8;
        -webkit-box-orient: vertical;
        p {
          line-height: 24px;
        }
      }
    }
  }

`

type PropertyPreviewProps = {
  data: PropertyProps
}

export const PropertyPreview = ({ data }: PropertyPreviewProps) => {
  const {
    name,
    id,
    description,
    price_total,
    price_m2,
    currency
  } = data
  const { push } = useRouter()

  const { userLanguage }:any = useContext(LangContext)

  const slides = [
    {
      slideCaption: 'title3',
      slideImage: {
        asset: 'https://http2.mlstatic.com/D_NQ_NP_754640-MLM45689255247_042021-O.webp',
        alt: 'alt'
      }
    },
    {
      slideCaption: 'title2',
      slideImage: {
        asset: 'https://http2.mlstatic.com/D_NQ_NP_799732-MLM45689255249_042021-O.webp',
        alt: 'alt'
      }
    },
    {
      slideCaption: 'title1',
      slideImage: {
        asset: 'https://http2.mlstatic.com/D_NQ_NP_600635-MLM45689255246_042021-O.webp',
        alt: 'alt'
      }
    }
]


  return (
    <StyledPropertyPreview>
      <Container className="property-container top">
        <SlideShow data={slides}/>
      </Container>
      <Container className="property-container bottom">
        <Container direction="row" justify="space-between">
          <h3>{name}</h3>
          <h2>{(price_total && formatter(price_total, currency)) || (price_m2 && formatter(price_m2, currency))}</h2>
        </Container>
        <PropertyTags data={data} />
        {description && <Container className="description-container">
          <Text textType="p">{description[userLanguage]}</Text>
        </Container>}
        <Container onClick={() => push(`/properties/${id}`)} className="read-more-container" align="flex-end">
          <Text textType="p">Read more</Text>
        </Container>
      </Container>
    </StyledPropertyPreview>
  )
}
