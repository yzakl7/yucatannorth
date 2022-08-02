import React, { useState } from 'react'
import styled from 'styled-components'
import { Container, Text } from '.'
import { Button } from '../inputs'

const StyledPaginator = styled(Container)`
  flex-direction: row;
  justify-content: center;
  align-items:center; 
  .button-container {
    width: 135px;
    button {
      background: none;
      border: none;
      padding: none!important;
      justify-content: center;
      p {
        text-decoration: underline;
        color: blue!important;
      }
    }

  }
  .page {
    user-select: none;
    align-items:center;
    &.logo {
      p {
        opacity: 0;
      }
    }
    &.active {
      h5 {
        color: red;
      }
      p {
        text-decoration: underline;
      }
    }
    h5 {
      font-size: 32px;
    }
    p {
      color: blue;
    }
  }
`

export const Paginator = ({
  value,
  onChange,
  maxValue,
}:any) => {

  console.log({maxValue});
  const getPages = () => {
    const pagesArray = Array.from(new Array(Math.ceil(maxValue) + 1).keys());
    let sliceRangeStart = value < 7 ? 0 : value - 5
    let sliceRangeEnd = value < 7 ? 10 : value + 5 

  
    if (value + 4 >= maxValue) {
      sliceRangeStart = maxValue - 9
      sliceRangeEnd = maxValue + 1
    } 

    if (!pagesArray[0]) {
      pagesArray.shift()
    }

    return pagesArray.slice(sliceRangeStart, sliceRangeEnd).map((page:number) => (
      <Container className={`${value === page ? 'active ' : ''}page`} onClick={() => onChange(page)} key={page}>
        <Text textType='h5'>o</Text>
        <Text textType='p'>{page}</Text>
      </Container>
    ))
    
  }
  
  
  
  return (
    <StyledPaginator>
      <Container className='button-container'>
        { value > 1 && <Button action={() => onChange(value - 1)} borders={false}>
          <Text textType='p'>
            Anterior
          </Text>
        </Button>}
      </Container>
      <Container className='logo page'>
        <Text textType='h5'>S</Text>
        <Text textType='p'>{'0'}</Text>
      </Container>
      {getPages()}
      <Container className='logo page'>
        <Text textType='h5'>l</Text>
        <Text textType='p'>{'0'}</Text>
      </Container>
      <Container className='logo page'>
        <Text textType='h5'>í</Text>
        <Text textType='p'>{'0'}</Text>
      </Container>
      <Container className='logo page'>
        <Text textType='h5'>s</Text>
        <Text textType='p'>{'0'}</Text>
      </Container>
      <Container className='button-container'>
        {value < maxValue && <Button action={() => onChange(value + 1)} borders={false}>
          <Text textType='p'>
            Siguiente
          </Text>
        </Button>}
      </Container>

    </StyledPaginator>
  )
}

export default Paginator
