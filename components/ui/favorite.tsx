import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Container } from '.'
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
import { getColor } from '../../utils/theme'

const StyledFavorite = styled(Container)`
  font-size: 32px;
  color: ${getColor('danger')};
  position: absolute;
  z-index: 5;
  right: 8px;
  top: 8px;
`
const Favorite = ({id}:any) => {

  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    const stringedArray = localStorage.getItem('favorites') || '[]'
    const propertyArray = JSON.parse(stringedArray)
    const alreadyFavorited = propertyArray.find((propertyId:string) => propertyId === id)
    if (alreadyFavorited) {
      setIsFavorited(true)
    }
  }, [])

  useEffect(() => {

    const stringedArray = localStorage.getItem('favorites') || '[]'
    const propertyArray = JSON.parse(stringedArray)

    if (isFavorited) {
      propertyArray.push(`${id}`)
      const arrayToString = JSON.stringify(propertyArray)
      localStorage.setItem('favorites', arrayToString)
    } else {
      const newPropertyArray = propertyArray.filter((propertyId:string) => id !== propertyId)
      const arrayToString = JSON.stringify(newPropertyArray)
      localStorage.setItem('favorites', arrayToString)
    }

  }, [isFavorited])

  // useEffect(() => {
  //   if (isFavorited) {
  //     localStorage.setItem('favorites', `${id}`)
  //   }
  // }, [isFavorited])

  return (
    <StyledFavorite onClick={() => setIsFavorited(!isFavorited)}>
      {isFavorited ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
    </StyledFavorite>
  )
}

export default Favorite