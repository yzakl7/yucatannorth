import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Container, Text } from '../ui'
import { StyledProps } from '../typings'
import { getColor } from '../../utils/theme'

interface SearchInputProps {
  value: string
  onChange: string
  origin: []
  
}

const StyledSearchInput = styled(Container)`
  width: 100%;
  gap: 0;
  flex-direction: column;
  label {
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    button {
      background: none;
      margin-left: -32px
    }
    input {
      z-index: 1;
      box-sizing: border-box;
      outline: none;
      width: 150px;
      height: 100%;
      min-height: 40px;
      padding: 0 9px;
      border: 1px solid;
      &.password {
        padding-right: 32px;
      }
      &:not(.bordered ) {
        border: none;
      }
    }
    .label-container {
      flex-1
    }
  }
  .spacer {
    transition: ease-in-out .3s all;
  }
  .message-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    .message {
      transition: ease-in-out .3s all;
      font-size: 14px;
      @media (max-width: 720px) {
        font-size: 11px;
      }
      text-align: center;
      border-bottom: 1px solid transparent;
      overflow: none;
      z-index: 0;
      &.visible {
        transform: ${({messageHeight}: StyledProps) => `translateY(calc( - ${messageHeight }px))`};
        visibility: visible;
        opacity: 1;
      }
      &.hidden {
        transform: ${({messageHeight}: StyledProps) => `translateY(calc( - ${messageHeight }px))`};
        visibility: hidden;
        opacity: 0;
      }
      &.error {
        border-color: ${getColor('danger')};
        p {
          color: ${getColor('danger')};
        }
      }
    }
  }
`

export const SearchInput = (data: SearchInputProps) => {
  return (
    <>
    </>
  )
}




export default SearchInput
