import styled from '@emotion/styled'
import React, { useContext } from 'react'
import { MdLanguage } from 'react-icons/md'
import { LangContext } from '../../utils/lang/langContext'
import { Text } from '../UI/style/text'

const StyledHeader = styled.div`
  box-shadow: 1px 1px 2px 1px rgb(0 0 0 / 35%);
  border-bottom: 1px solid #e8dbba;
  background: #c2af5f;
  color: antiquewhite;
  z-index: 4; 
  padding: 16px;
  justify-content: space-between;
  flex-direction: row;
  h3, button {
    font-size: 28px;
    color: white;
    text-shadow: 1px 1px 2px rgb(0 0 0 / 35%);
  }
  svg {
    box-shadow: 1px 1px 2px 1px rgb(0 0 0 / 35%);
    stroke: white;
    color: white;
    border-radius: 50%;
  }
  button {
    padding: 0;
    background: none;
    border: transparent;
    margin: 0;
    justify-content: center;
    align-items: center;
    display: flex;
  }
`
export const Header = () => {
  const { userLanguage, userLanguageChange} = useContext(LangContext)
  return (
    <StyledHeader>
      <Text textType="h3">Yucatán North</Text>
      <button onClick={() =>  userLanguageChange(userLanguage === 'es' ? 'en' : 'es')}><MdLanguage /></button>
    </StyledHeader>
  )
}
