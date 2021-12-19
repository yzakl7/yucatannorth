import styled from '@emotion/styled'
import React, { useContext } from 'react'
import { LangContext } from '../../utils/lang/langContext'
import TextInput from '../UI/inputs/text-input'
import Container from '../UI/style/container'

const StyledSendEmail = styled(Container)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  .content {
    flex: 1;
    gap: 16px;
    min-width: 230px;
    &.right {
      max-width: 475px;
    }
  }
  input {
    color: gray;
  }
  input, textarea {
    &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      opacity: 1; /* Firefox */
      color: black;
    }
    background: #f5f5f5;
    border-radius: 3px;
    border-color: gray;
    font-family: roboto;
  }
`

export const SendEmail = () => {
  const { dictionary, userLanguage } = useContext(LangContext) || ''
  const { leave_a_comment, name, email, phone }:any = dictionary.properties.details.contact_us

  return (
    <StyledSendEmail>
      <Container className="content left">
        <TextInput bordered placeholder={leave_a_comment} multiline="8"/>
      </Container>
      <Container className="content right" justify="space-between">
        <TextInput bordered placeholder={name}/>
        <TextInput bordered placeholder={email}/>
        <TextInput bordered placeholder={phone}/>
      </Container>
      
    </StyledSendEmail>
  )
}
