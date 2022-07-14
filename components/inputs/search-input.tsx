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
  
}

const StyledSearchInput = styled(Container)`
  flex-direction: row;
  align-items: center;
  border: 1px solid ${getColor('border')};
  padding: 0 16px; 
  .search-icon-container {
    color: ${getColor('primary')};
  }
  input {
    padding: 0!important;
  }
`

export const SearchInput = ({value:defaultValue, onChange: propsOnchange}: SearchInputProps) => {
  const [value, setValue] = useState(defaultValue)

  const onChange = (e:any) => {
    setValue(e.value)
  }

  const handleKeyPress = (e:any) => {
    const enterPressed = e.key === 'Enter'
    if(enterPressed){
      onSearch()
    }
  }

  const onSearch = () => {
    propsOnchange(value)
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [value])
  
  return (
    <StyledSearchInput gap='8px' className='search-input-container'>
      <TextInput value={value} onChange={onChange} />
      <Container className='search-icon-container' onClick={onSearch}>
        <FaSearch />
      </Container>
    </StyledSearchInput>
  )
}




export default SearchInput
