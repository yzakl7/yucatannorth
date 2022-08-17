import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { BiMessageSquareAdd, BiReset, BiSave } from 'react-icons/bi'
import { BsSave2 } from 'react-icons/bs'
import { FiDelete } from 'react-icons/fi'
import styled from 'styled-components'
import { hooks, settingsOperations, settingsSelectors } from '../../state'
import { getColor, useEffectOnDemand } from '../../utils'
import { SearchInput, Select, TextInput } from '../inputs'
import { Container, Text } from '../ui'

const StyledCategoryManager = styled(Container)`
  z-index: 5;
  max-height: calc(100vh - 481px);
  width: 100%;
  .category-manager-body {
    flex-direction: row;
    max-height: calc(100% - 16px);
    .filter-list { 
      overflow: auto;
      flex: 1;
      min-width: 250px;
      flex-shrink: 0;
      .filter-container {
        flex-shrink: 0;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        height: 45px;
        cursor: pointer;
        &.selected, &:hover {
          background: rgba(0,0,0,0.25);
        }
      }
    }
    .filter-options-wrapper {
      flex: 2;
      gap: 8px;
      .filter-options-header {
        flex-direction: row;
        justify-content: space-between;
        .category-action-buttons {
          flex-direction: row;
        }
        .delete-category {
          border: 1px solid ${getColor('danger')};
          border-radius: 3px; 
          width: 45px;
          justify-content: center;
          align-items: center;
        }
        .reset-category {
          border: 1px solid ${getColor('text')};
          border-radius: 3px; 
          width: 45px;
          justify-content: center;
          align-items: center;
        }
      }
      .filter-options {
        align-content: flex-start;
        overflow: auto;

        max-height: calc(100% - 56px);
        flex-wrap: wrap;
        flex-direction: row;
        flex-shrink: 0;
        gap: 16px;
        .option {
          flex-direction: row;
          padding: 8px;
          align-content: center;
          cursor: pointer;
          border: 1px solid ${getColor('border')};
          border-radius: 3px;
          .delete-option {
            &:hover {
              background: ${getColor('border')};
            }
          }
        }
        .add-option-button {
          flex-direction: row;
          padding: 8px;
          border-radius: 3px;
          align-items: flex-end;
          &:hover {
            background: ${getColor('border')};
          }
        }
      }
    }
  }
`

export const CategoryManager = () => {
  
  const { selectSettings } = settingsSelectors
  const { updateFiters } = settingsOperations
  const { useAppSelector, useAppDispatch } = hooks
  const { settings } = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()
  
  const [ categories, setCategories ] = useState<any>(settings?.categories)
  const [ filteredCategories, setFilteredCategories ] = useState<any>(settings?.categories)
  const [ selectedCategory, setSelectedCategory ] = useState()
  const [ searchValue, setSearchValue ] = useState('')

  const filterObject = 
    filteredCategories 
      ?
        Object.keys(filteredCategories).map((cat, i) => {
          return ({
            filterKey: cat,
            order: settings.categories[cat].order,
          })

        })
      :
        []

  const compare = (a:any, b:any) => {
    if (Number(a.order) < Number(b.order)) {
      return -1
    }
    if (Number(a.order) > Number(b.order)) {
      return 1
    }

    return 0
  }

  const sortedObj = filterObject?.sort(compare)

  const filters = (
    <>
      {
        sortedObj.map(({filterKey}:any) => {
          const isSelected = selectedCategory === filterKey
          return (
            <Container
              className={`filter-container${ isSelected ? ' selected' : ''}`}
              key={filterKey}
              onClick={() => setSelectedCategory(filterKey)}
            >
              <Text textType='p'>{filteredCategories[filterKey].label}</Text>
            </Container>
          )
        })
      }
    </>
  )

  const saveFilters = () => {
    dispatch(updateFiters(categories))
  }
  
  const deleteCategory = () => {
    const newCategories = {
      ...categories,
      [(selectedCategory as any)]: {
        ...categories[(selectedCategory as any)],
        options: []
      }}
    setCategories(newCategories)
  }

  const resetData = () => {
    setCategories(settings.categories)
  }
  
  const deleteOption = (opt: string) => {
    const newOptiopns = categories[(selectedCategory as any)].options.filter((optn:string) => optn !== opt)

    const newCategories = {
      ...categories,
      [(selectedCategory as any)]: {
        ...categories[(selectedCategory as any)],
        options: newOptiopns
      }}
    setCategories(newCategories)
  }

  const sortedOptions = selectedCategory 
    ?
      [...filteredCategories[selectedCategory].options].sort(
        (a:any, b:any) => a.toUpperCase().localeCompare(b.toUpperCase())
      ) 
    :
      []
  
  const categoryOptions = (
    <>
      { selectedCategory 
        && filteredCategories[selectedCategory] 
        && (
          sortedOptions.map((opt:any) => (
            <Container className='option' key={opt}>
              <Text textType='p'>{opt}</Text>
              <Container className='delete-option' onClick={() => deleteOption(opt)}>
                <AiOutlineDelete color={getColor('danger')}/>
              </Container>
            </Container>
          ))
        ) 
      }
    </>
  )

  const addOption = () => {
    const newOptiopns = [ ...categories[(selectedCategory as any)].options ]
    newOptiopns.push(searchValue)

    const newCategories = {
      ...categories,
      [(selectedCategory as any)]: {
        ...categories[(selectedCategory as any)],
        options: newOptiopns
      }}
    setCategories(newCategories)
  }

  useEffect(() => {
    if (!searchValue) {
      setFilteredCategories(categories)
    } else {
      const newOptions = selectedCategory && (categories[selectedCategory].options as any).filter((opt:any) => {
        return opt.toLowerCase().indexOf(`${searchValue}`.toLowerCase()) !== -1

      })
      setFilteredCategories({
        ...filteredCategories,
        [(selectedCategory as any)]: {
          ...filteredCategories[(selectedCategory as any)],
          options: newOptions
        }})
    }

  }, [searchValue])

  useEffect(() => {
    setFilteredCategories(categories)
    setSearchValue('')
  }, [categories])

  useEffect(() => {
    if (settings) {
      setSearchValue('')
    }
  }, [settings])
  

  useEffect(() => {
    setSearchValue('')
  }, [selectedCategory])
  
  return (
    <StyledCategoryManager>
      <Text textType='h4'>Categorías</Text>
      <Container className='category-manager-body'>
        <Container className='filter-list'>{ filters }</Container>
        {selectedCategory &&  <Container className='filter-options-wrapper'>
          <Container className='filter-options-header'>
            {/* <TextInput value={selectedCategory} /> */}
            <SearchInput value={searchValue} onChange={setSearchValue}/>
            <Container className='category-action-buttons'>
              <Container className='delete-category' onClick={deleteCategory}>
                <AiOutlineDelete color={getColor('danger')} size={24}/>
              </Container>
              <Container className='reset-category' onClick={resetData}>
                <BiReset color={getColor('text')} size={24}/>
              </Container>
              <Container className='reset-category' onClick={saveFilters}>
                <BiSave color={getColor('text')} size={24}/>
              </Container>
            </Container>
          </Container>
          <Container className='filter-options'>
            { 
              categoryOptions
            }
            {
              searchValue && !filteredCategories[selectedCategory].options.length && (
              <Container className='add-option-button' onClick={addOption}>
                <Text textType='p'>{searchValue}</Text>
                <BiMessageSquareAdd color={getColor('danger')} size={24}/>
              </Container>)
            }
          </Container>

        </Container>}
      </Container>
    </StyledCategoryManager>
  )
}
