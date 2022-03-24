import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { getColor } from '_src/utils/theme'
import { Button } from '.'
import { ValuesType, SurveySelectProps } from '../typings'
import { Container, Text } from '../ui'

const StyledSurveySelect = styled(Container)`
  flex-direction: column;
  width: 100%;
  align-items: center;
  label {
    cursor:pointer;
    width: 100%;
    input {
      display: none;
      &:not(:checked):not(.selected) + button {
        border-color: ${getColor('darkLight')};
        p {
          color: ${getColor('dark')};
        }
      }
    }
    button{
      width: 100%;
      transition: ease-in-out .3s all;
      pointer-events: none;
      user-select: none;
      div {
        flex: 1;
      }
      p {
        transition: ease-in-out .3s all;
        white-space: break-spaces;
      }
    }
  }
  .input-container {
    width: 100%;
    margin-bottom: 32px;
    .range-container button {
      padding: 12px 16px;
    }

    .message {
      width: 100%;
    }
    &.warning {
      h3 {
        span {
          border-bottom: 1px ${getColor('danger')} solid;
          max-width: unset;
          visibility: visible;
          opacity: 1;
          color: ${getColor('danger')};
          height: 24px;
        }
      }
    }

    h3 {
      display: flex;
      flex-direction: column;
      span {
        border: 1px solid transparent;
        transition: all ease-in-out .3s;
        opacity: 0;
        height: 0;
        visibility: hidden;
        overflow: hidden;
      }
    }
  }
  textarea {
    border: 1px solid;
    max-width: 300px;
    color: ${getColor('darkLight')};
  }
  h3 {
    font-size: 16px;
    font-family: Open Sans;
    font-weight: 400;
    text-align: center;
  }
`

export const SurveySelect = ({ options, label, allowMulti }: SurveySelectProps) => {
  const [values, setValues] = useState<ValuesType>({})
  return (
  <StyledSurveySelect className='survey-select-container'>
      <Text textType="h3">
        {`${label}`}
      </Text>
      {
        options && options.map(({ _key, _type, option }) => {
          const stateName = option.id
          const onChange = (event:React.MouseEvent<HTMLInputElement, MouseEvent>) => {
            const target = event.target as HTMLInputElement;
            const isChecked = target.checked
            const getValues = () => {
              if (values[stateName]) {
                const newArray: any[] = values[stateName].value 
                if (isChecked) {
                  if(Array.isArray(newArray)) {newArray?.push(option)}
                } else {
                  const optionIndex: number | undefined = newArray?.indexOf(option)
                  if ((optionIndex || optionIndex === 0) && Array.isArray(newArray)) {newArray?.splice(optionIndex, 1)}
                }
                return newArray
              }
              return [option]
            }
            
            const value = allowMulti 
              ? getValues()
              : isChecked && option
            
            return setValues({
              ...values,
              [stateName]: {
                value
              }
            })
          }
          return (
            <label key={_key}>
              <input
                onChange={(e:any) => onChange(e)}
                type={allowMulti ? 'checkbox' : 'radio'}
                name={label}
                checked={
                  allowMulti
                    ? values[stateName]?.value.includes(option)
                    : option === values[stateName]?.value
                }
              />
              <Button buttonStyle="primaryReverse" action={(e:React.MouseEvent<HTMLButtonElement>) => e && e.preventDefault()}>
                <Text textType='p'>{`${option}`}</Text>
              </Button>
            </label>
          )
        })
      }
    </StyledSurveySelect>
  )
}
