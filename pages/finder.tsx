import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlinePoweroff } from 'react-icons/ai'
import { RiEditBoxLine } from 'react-icons/ri'
import styled from 'styled-components'
import { IconButton, SearchInput } from '../components/inputs'
import { Map } from '../components/layout'
import { Container, Image, Modal, Paginator, Text } from '../components/ui'
import { authSelectors, hooks, sparePartsOperations, sparePartsSelectors } from '../state'
import { usePrevious } from '../utils'
import { getColor } from '../utils/theme'
import { v4 as uuid } from 'uuid'
import SpareParts from './admin/spare-parts'

const logo = "https://firebasestorage.googleapis.com/v0/b/refacciones-solis.appspot.com/o/assets%2Frefacciones-solis-logo.png?alt=media&token=2368b436-f8fc-4b60-a0d2-4bb854471b8e"

const StyledFinder = styled(Container)`

  padding: 16px;
  padding-top: 68px;
  .search-bar-container {
    align-items: center;
    gap: 32px;
    .logo-container {
      max-width: 350px;
    }
    .search-container {
      width: 100%;
      max-width: 500px;
    }
  }
  .row {
    position: sticky;
    top: 68px;
    gap: 8px;
    padding-top: 8px;
    z-index: 1;
    background: white;
    border-bottom: 1px solid ${getColor('border')};
    padding-bottom: 8px;
    flex-direction: row;
    .logo-container {
      max-width: 75px;
    }
    @media (max-width: 1024px) {
      top: 42px;
    }
  }
  .auth-padding {
    height: 68px;
  }
  .pill {
    border: 1px solid ${getColor('border')};
    padding: 4px 8px;
    border-radius: 4px;
  }
  h2 {
    color: ${getColor('primary')};
  }
  h3 {
    padding-top: 8px;
    line-height: 24px;
  }
  .spare-parts-container {
    align-self: center;
    align-items: stretch;
  }
  .no-results-filters-container {
    align-self: center;
    width: 100%;
  }
`
export const Finder = () => {
  const { useAppDispatch, useAppSelector } = hooks
  const { getSparePartList } = sparePartsOperations
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const prevSearchValue = usePrevious(searchValue)
  const { selectSpareParts } = sparePartsSelectors
  const { isAuthenticatedSelector } = authSelectors
  const { sparePartList, isFetching } = useAppSelector(selectSpareParts)
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)

  const dispatch = useAppDispatch()

  const onSearchValueChange = (newSearchValue:string) => {
    setSearchValue(newSearchValue)
  }

  const onSearch = () => {
    if (searchValue) {
      dispatch(getSparePartList(({query: searchValue})))
    }
  }

  const renderSearchBar = () => {
    const hasResults = sparePartList?.length
    return (
      <Container className={`search-bar-container${hasResults ? ' row' : ' column'}` }>
        <Container className='logo-container'>
          <Image
            alt="refacciones solis logo"
            src={logo}
          />
        </Container>
        <Container className='search-container'>
          <SearchInput
            value={searchValue}
            onChange={onSearchValueChange}
            onSearch={onSearch}
          />
        </Container>
      </Container>
    )
  }

  const renderSpareParts = ( ) => {
    const sliceRangeStart = currentPage > 1 ? (currentPage - 1) * 10 : 0
    const sliceRangeEnd = (currentPage * 10)

    return (
      <Container className='spare-part-list-container' gap='40px'>
        {
          sparePartList?.slice(sliceRangeStart, sliceRangeEnd).map((sparePart: any) => {
            const {
              name,
              sku,
              id,
              description,
              disabled,
              years,
              similars,
              item_brand,
              car_brand,
              category,
              family,
              line,
              liters,
              motor,
              support_models,
              valves
            } = sparePart
            const filters = [
              item_brand,
              car_brand,
              category,
              family,
              line,
              liters,
              motor,
              support_models,
              valves
            ]
            if (disabled) {
              return <></>
            }
            return (
              <Container className='sparePart-container' key={`${id}`} gap='8px'>
                <Container direction='row'>
                  <Container  gap='8px'>
                    <Container direction='row'></Container>

                    {name && <Text textType='h2'>{name}</Text>}
                    {sku && <Text textType='span'>{sku}</Text>}
                    <Container direction='row'>
                      {item_brand && <Text textType='span'>{`Marca: ${item_brand}`}</Text>}
                      {years && <Text textType='span'>{`años: ${years[0] } - ${years[1]}`}</Text>}
                    </Container>
                  </Container>

                </Container>
                {description && <Text textType='h3'>{description}</Text>}
                {similars && <Text textType='h5'>{similars}</Text>}
                <Container className='details-container' direction='row' wrap='wrap' gap='8px'>
                  {
                    Object.keys(filters).map((filter:any) => (
                      filters[filter]
                      ?
                        <Container key={uuid()} className='pill' direction='row'>

                          <Text textType='span'>
                            {filters[filter]}
                          </Text>
                        </Container>
                      : <></>
                    ))
                  }
                </Container>
              </Container>
            )
          })
        }
      </Container>
    )
  }

  const renderPaginator = () => {
    return (
        <Container className='paginator-container'>
          <Paginator value={currentPage} onChange={setCurrentPage} maxValue={sparePartList?.length / 10}/>
        </Container>
    )
  }

  return (
    <StyledFinder gap='32px'>
      <SpareParts noEdit/>
    </StyledFinder>
  )
}
export default Finder