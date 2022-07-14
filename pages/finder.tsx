import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SearchInput } from '../components/inputs'
import { Map } from '../components/layout'
import { Container, Image, Text } from '../components/ui'
import { hooks, sparePartsOperations } from '../state'
import { usePrevious } from '../utils'
import { getColor } from '../utils/theme'

const logo = "https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Frefacciones-solis-logo.png?alt=media&token=2368b436-f8fc-4b60-a0d2-4bb854471b8e"
const StyledFinder = styled(Container)`
  padding: 96px 32px;
  .search-bar-container {
    border-bottom: 1px solid ${getColor('border')};
    padding-bottom: 32px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    .logo-container {
      max-width: 350px;
      img {
        object-fit: contain;
      }
    }
    .search-icon-container {
      flex: 1;
    }
    .search-input-container {
      max-width: 550px;
      min-width: 200px;
      width: 100%;
    }
    &.column {
      border-bottom: none;
      .search-icon-container {
        width: 100%;
        align-items: center;
      }
    }
    &.row {
      flex-direction: row;
      .logo-container {
        max-width: 85px;
        img {
          object-fit: contain;
        }
      }
    }
  }
  @media (max-width: 1024px) {
    padding: 64px 32px;
  }
`

export const Finder = () => {
  const { useAppDispatch } = hooks
  const { getSparePartList } = sparePartsOperations
  const [searchValue, setSearchValue] = useState('')
  const prevSearchValue = usePrevious(searchValue)
  const dispatch = useAppDispatch()

  const onSearchValueChange = (newSearchValue:string) => {
    setSearchValue(newSearchValue)
  }

  const renderSearchBar = () => {
    const hasResults = false
    return (
      <Container className={`search-bar-container${hasResults ? ' row' : ' column'}` }>
        <Container className='logo-container'>
          <Image
            alt="refacciones solis logo"
            src={logo}
          />
        </Container>
        <Container className='search-icon-container' onClick={() => null}>
          <SearchInput
            value={searchValue}
            onChange={onSearchValueChange}
          />
        </Container>
      </Container>
    )
  }

  useEffect(() => {
    if (prevSearchValue !== searchValue && searchValue) {
      console.log({ searchValue })
    }
  }, [searchValue])

  useEffect(() => {
    dispatch(getSparePartList({ filters: { family: "FILTRO DE ACEITE" }}))
  }, [])



  return (
    <StyledFinder>
      {renderSearchBar()}
    </StyledFinder>
  )
}
export default Finder