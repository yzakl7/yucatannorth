import styled from '@emotion/styled'
import React from 'react'
import Container from './container'
import { FaSearch } from 'react-icons/fa'

const StyledSearchBar = styled(Container)`
  margin: 0 16px;
  padding: 16px 32px;
  background: white;
  border-darius: 3px;
  flex-direction: row;
  position: sticky;
  top: 0;
  z-index: 6;
  align-items: center;
  input {
    outline: none;
    border: none;
    flex: 1;
    background: #f2f2f2;
    padding: 8px;
  }

  .search-icon-container {
    position: absolute;
    right: 45px;
  }


`

export const SearchBar = ({
  array,
  searchIn,
  callback
}: {array: [], searchIn:string, callback: ([]) => void}) => {
  return (
    <StyledSearchBar>
      <input
        type="text"
        onChange={({target: { value }}) => {
          const newArray: [] = []
          array.map((element)=>{ 
            const { name }: {name: string} = element
            const res = name.toLowerCase().indexOf(value)
            if (res !== -1) {
              newArray.push(element);
            }
          })
          callback(newArray)
        }}
      />
      <Container className='search-icon-container'>
        <FaSearch />
      </Container>

    </StyledSearchBar>
  );
};

