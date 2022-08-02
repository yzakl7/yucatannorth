import { Component, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Container, Text } from '../ui'
import { StyledProps } from '../typings'
import { getColor } from '../../utils/theme'
import { TextInput } from '.'
import { FaSearch } from 'react-icons/fa'

interface SearchInputProps {
  value: string
  onChange: (newValue: string) => void
  onSearch: () => void
  
}

const StyledSearchInput = styled(Container)`
  flex-direction: row;
  align-items: center;
  border: 1px solid ${getColor('border')};
  .search-icon-container {
    flex: unset;
    padding: 8px;
    color: ${getColor('primary')};
  }
  .text-input {
    padding: 0!important;
    input {
      border: none;
      flex: 1;
    }
  }
`

export const SearchInput = ({value, onChange, onSearch}: SearchInputProps) => {
  return (
    <StyledSearchInput gap='8px' className='search-input-container'>
      <TextInput value={value} onChange={(e) => onChange(e.target.value)} />
      <Container className='search-icon-container' onClick={onSearch}>
        <FaSearch />
      </Container>
    </StyledSearchInput>
  )
}




export default SearchInput
