import { getColor } from '../../utils/theme'
import { ActivityIndicator, Text } from '../ui'
import { ButtonProps } from '../typings'
import styled from '@emotion/styled'

const StyledButton = styled.button`
  padding: 9px 36px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
  transition: all ease-in-out .3s;
  display: flex;
  align-items: center;
  p {
    white-space: nowrap;
  }
  &.default {
    border: 1px solid ${getColor('dark')};
    p {
      color: ${getColor('black')};
    }
    background: ${getColor('light')};
    &:hover {
      background: ${getColor('lightDark')};
    }
  }
  &.primary {
    p {
      color: ${getColor('white')};
    }
    background: ${getColor('primary')};
    &:hover {
      background: ${getColor('primaryDark')};
    }
  }
  &.primaryReverse {
    border: 1px solid ${getColor('primary')};
    p {
      color: ${getColor('primary')};
    }
    background: ${getColor('white')};
    &:hover {
      background: ${getColor('lightDark')};
    }
  }
  &:disabled {
    background: ${getColor('lightDark')};
    p {
      color: ${getColor('darkLight')};
    }
    &:hover {
      background: ${getColor('lightDark')};
    }
  }
  &.borderless {
    border: none;
  }
`

export const Button = ({
  children,
  buttonStyle = "default",
  action,
  isDisabled,
  borders = true,
  activityIndicator
}: ButtonProps) => {
  const isText = typeof children === "string"
  return (
    <StyledButton disabled={isDisabled || activityIndicator} onClick={action} className={`${buttonStyle} ${borders ? '' : 'borderless'}`}>
      {!activityIndicator 
        ? 
          isText ? <Text textType=''>{children}</Text> : children
        : <ActivityIndicator />
      }
    </StyledButton>
  )
}

export default Button
