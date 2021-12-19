import styled from '@emotion/styled'
import React, { useContext } from 'react'
import Container from '../UI/style/container'
import { Tag } from '../UI/style/tag'
import { PropertyProps } from './types'
import { FaVectorSquare } from 'react-icons/fa'
import { RiHomeSmile2Line } from 'react-icons/ri'
import { formatter } from '../../utils/formatter'
import { LangContext } from '../../utils/lang/langContext'

const StyledPropertyTags = styled(Container)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
`

type PropertyTagsProps = {
  data: PropertyProps
}

export const PropertyTags = ({ data }: PropertyTagsProps) => {
  const {
    name,
    measures,
    description,
    price_total,
    price_m2,
    property_type,
    currency
  } = data

  const { userLanguage }:any = useContext(LangContext)

  return (
    <StyledPropertyTags className="tags-container">
      {property_type && (
        <Tag>
          <h4>{property_type}</h4>
        </Tag>
      )}
      {measures?.land_area && (
        <Tag>
          <FaVectorSquare />
          <h5>{formatter(measures.land_area, "m2")}</h5>
        </Tag>
      )}
      {measures?.built_area && (
        <Tag>
          <RiHomeSmile2Line />
          <h5>{formatter(measures.built_area, "m2")}</h5>
        </Tag>
      )}
    </StyledPropertyTags>
  )
}
