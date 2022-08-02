import React from 'react'
import styled from 'styled-components'
import { getColor } from '../../utils'
import { Container, Text } from '../ui'

interface TextInputProps {
  placeholder?: string,
  value?: string,
  label?: string,
  textOnly?: boolean,
  onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void,
  onClick?: React.MouseEventHandler<HTMLInputElement>
  onFocus?: (e:React.ChangeEvent<HTMLInputElement>) => void,
  onBlur?: (e:React.ChangeEvent<HTMLInputElement>) => void,
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>,
  type?: string,
  color?: string,
  background?: string
}

const StyledInput = styled(Container)`
  position: relative;
  flex-direction: row;
  flex: 1;
  input {
    padding: 15px;
    outline: none;
  }
  .label {
    flex: 1;
    position: absolute;
    top: -12px;;
    padding: 34px;
    left: 12px;
    p {
      font-weight: 400;
      font-size: 11px;
    }
  }
`

export const TextInput = ({
  placeholder,
  value,
  type='text',
  label,
  onChange,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
}: TextInputProps) => {
  return (
    <StyledInput className={'text-input'}>
      {label && <Container className={'label'}>
        <Text textType='p'>
          {label}
        </Text>
      </Container>}
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </StyledInput>
  )
}
export default TextInput