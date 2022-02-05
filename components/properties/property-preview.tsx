import styled from '@emotion/styled'
import React, { useContext, useEffect, useState } from 'react'
import Container from '../UI/style/container'
import { Tag } from '../UI/style/tag'
import { PropertyProps, SlidesType } from './types'
import { FaVectorSquare } from 'react-icons/fa'
import { RiHomeSmile2Line } from 'react-icons/ri'
import { formatter } from '../../utils/formatter'
import { useRouter } from 'next/router'
import { LangContext } from '../../utils/lang/langContext'
import { PropertyTags } from './property-tags'
import { Text } from '../UI/style/text'
import SlideShow from '../UI/style/slide-show'
import { getImageList } from '../api/firebaseAPI'
import { getDownloadURL } from 'firebase/storage'

const StyledPropertyPreview = styled.article`
  flex-direction: column;
  cursor: pointer;
  flex: 1;
  .property-container {
    max-height: 335px;
    flex-direction: column;
    &.top {
      height: 100%;
      flex: 1;
    }
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
    currency,
    images = []
  } = data

  const { push } = useRouter()

  const { userLanguage }:any = useContext(LangContext)

  const propertyImages: SlidesType[] = images.map(({name: imgName, imgUrl}: any) => ({
    slideCaption: imgName,
    slideImage: {
      asset: imgUrl,
      alt: imgName
    }
  }))

  return (
    <StyledPropertyPreview>
      <Container className="property-container top">
        {propertyImages && propertyImages.length > 0 && <SlideShow data={propertyImages}/>}
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
