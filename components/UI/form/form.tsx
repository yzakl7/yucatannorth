import styled from '@emotion/styled'
import { Fragment, useEffect, useState } from 'react'
import CheckBox from '../inputs/checkbox'
import NumberInput from '../inputs/number-input'
import Select from '../inputs/select'
import TextInput from '../inputs/text-input'
import Container from '../style/container'
import Tooltip from '../style/tooltip'

type FormElementType = 'inputGroup' 
  | 'textInput'
  | 'select'
  | 'checkBox'
  | 'switch'
  | 'title'
  | 'numberInput'

export type CommonProps = {
  direction?: string
  multiline?: string
  name?: string
  type?: any
  value?: string | number
  fallbackOnEmpty?: string | number
  wrap?: boolean
  array?: CommonProps[]
  options?: string[]
  range?: number[]
  minWidth?: string
  isRequired?: boolean
  isPassword?: boolean
  placeholder?: string
  validation?: 'isEmail' | ((value?: string | undefined) => { isValid: boolean; text: string; type: string; })
  months?: boolean
  flex?: string
  label?: string
  tooltip?: string
}

const StyledForm = styled(Container)`
  gap: 16px;
  .input-group-row {
    flex: 1 ;
    gap: 16px;
    .group-container {
      width: 100%;
    }
  }
  .input-row {
    flex: 1 ;
    align-items: center;
    .group-container {
      width: 100%;
    }
    position: relative;
    align-items: flex-start;
    width: 100%;
    gap: 16px;
    .row-element {
      position: unset;
      align-items: center;
    }
  }
`

export interface FormProps {
  data: CommonProps[]
  onChange: (params: {values: OnChangeType, hasErrors: boolean}) => void
}

interface FormStateProps {
  [key: string]: {
    value?: string | boolean,
    isValid?: boolean
  }  
}

type OnChangeType = {
  [key: string]: string,
}

type ErrorsType = {
  [key: string]: boolean,
}

export const Form = ({ data, onChange }: FormProps) => {
  const [formState, setFormState] = useState<FormStateProps>({})

  useEffect(() => {
    const values:OnChangeType = {}
    const errors:ErrorsType = {}
    const formStateKeys = Object.keys(formState)
    
    formStateKeys.forEach((stat) => {
      errors[stat] = !formState[stat].isValid
      values[stat] = `${formState[stat].value || ''}`
    })

    const hasErrors = Object.keys(errors).find((el) => !!errors[el])
    onChange({values, hasErrors: !!hasErrors})
  }, [formState])

  useEffect(() => {
    const newState:FormStateProps = {}
    const checkRequired = (arr: CommonProps[]) => arr.forEach((el) => {
      if (el.array) {
        checkRequired(el.array)
      } else if (el.isRequired) {
        if (el.name) {
          newState[el.name] = {
            isValid: false,
            value: ''
          }
        }
      }
      
    })
    setFormState(newState)
    checkRequired(data)

  }, [])

  
  const renderInputGroup = (element: CommonProps) => {
    const { wrap, array, flex, label, direction, minWidth } = element;
    return (
      <Container className="group-container" direction="column" flex={flex}  minWidth={minWidth}>
        {label && <p>{label}</p>}
        <Container align="flex-start" direction={direction|| 'row'} className={`input-group-row`} wrap={wrap ? 'wrap' : undefined}>
          {
            array?.map((element:CommonProps) => renderElement(element))
          }
        </Container>
      </Container>
    )
  }
  const renderNumberInput = (element: CommonProps) => {
    const {
      minWidth,
      placeholder,
      isRequired,
      flex = '1',
      isPassword,
      validation,
      fallbackOnEmpty,
      type,
      name = '',
      value: elementValue = ''
    } = element;
    const value = `${(name && formState[name] && formState[name].value) || elementValue}`

    return (
      <Container
        key={`${name}-${type}`}
        className="row-element"
        flex={flex}
        minWidth={minWidth}
      >
        <NumberInput
          isRequired={isRequired}
          placeholder={placeholder}
          bordered
          value={value}
          onChange={({value, isValid}:Record<string, any>) => {
            
            const newFormState:typeof formState = {
              ...formState
            }

            if (name) {
              newFormState[name] = {
                value,
                isValid
              }
            }

            return (
              setFormState(newFormState)
            )
          }}
        />
      </Container>
    )
  }

  const renderTextInput = (element: CommonProps) => {
    const {
      minWidth,
      placeholder,
      isRequired,
      flex = '1',
      isPassword,
      multiline,
      fallbackOnEmpty,
      validation,
      type,
      name = '',
      value: elementValue = ''
    } = element;
    const value = `${(name && formState[name] && formState[name].value) || elementValue}`
    
    return (
      <Container
        key={`${name}-${type}`}
        className="row-element"
        flex={flex}
        minWidth={minWidth}
      >
        <TextInput
          password={isPassword}
          isRequired={isRequired}
          fallbackOnEmpty={fallbackOnEmpty}
          multiline={multiline}
          bordered
          value={value}
          onChange={({value, isValid}) => {
            
            const newFormState:typeof formState = {
              ...formState
            }

            if (name) {
              newFormState[name] = {
                value,
                isValid
              }
            }

            return (
              setFormState(newFormState)
            )
          }}
          placeholder={placeholder}
          validation={validation}
        />
      </Container>
    )
  }

  const renderSelect = (element: CommonProps) => {
    const {
      minWidth,
      placeholder,
      flex = '1',
      options,
      range,
      months,
      tooltip,
      value: elementValue,
      name,
      type,
      isRequired,
    } = element;
    const value = `${(name && formState[name] && formState[name].value) || elementValue}`
    return (
      <Container
        className="row-element"
        flex={flex}
        minWidth={minWidth}
      >
        <Select
          value={value}
          placeholder={placeholder}
          options={options}
          range={range}
          months={months}
          onChange={(value) => {
            const isValid = isRequired ? !!value : true
            const newFormState:typeof formState = {
              ...formState
            }

            if (name) {
              newFormState[name] = {
                value: `${value}`,
                isValid
              }
            }

            return (
              setFormState(newFormState)
            )
          }}
        />
        {tooltip && <Tooltip text={tooltip} />}
      </Container>
    )
  }


  const renderCheckBox = (element: CommonProps, isSwitch: boolean) => {
    const {
      flex = '1',
      name = '',
      type,
      value: elementValue,
      label,
      isRequired
    } = element;

    const value = (name && formState[name] && formState[name].value) || elementValue
    
    return (
      <Container
        key={`${name}-${type}`}
        flex={flex}
        className="row-element"
      >
        <CheckBox
          style={isSwitch ? 'switch' : undefined}
          value={formState[name]?.value !== undefined ? !!formState[name]?.value : !!elementValue}
          onChange={(value) => {
            const newFormState:typeof formState = {
              ...formState
            }

            if (name) {
              newFormState[name] = {
                value,
                isValid: true
              }
            }
            return (
              setFormState(newFormState)
            )
          }}
          // onChange={(value) => {
          //   const isValid = isRequired ? !!value : true
          //   const newFormState:typeof formState = {
          //     ...formState
          //   }

          //   if (name) {
          //     newFormState[name] = {
          //       value: `${value}`,
          //       isValid
          //     }
          //   }

          //   return (
          //     setFormState(newFormState)
          //   )
          // }}
        >{label}</CheckBox>
      </Container>
    )
  }
  const renderTitle = (element: CommonProps) => {
    const {
      label,
      tooltip,
      name,
      type
    } = element;
    return (
      <Container key={`${name}-${type}`} className="input-row">
        <Container className="row-element" align="flex-end" flex={'1'}>
          <p>{label}</p>
          {tooltip && <Tooltip text={tooltip} />}
        </Container>
      </Container>

    )
  }


  const renderElement = (element: CommonProps) => {
    const elements = {
      inputGroup: renderInputGroup(element),
      textInput: renderTextInput(element),
      select: renderSelect(element),
      checkBox: renderCheckBox(element, false),
      title: renderTitle(element),
      switch: renderCheckBox(element, true),
      numberInput: renderNumberInput(element)
    }
    const { type } = element 
    return type && (elements as any)[type]
  }
  return (
    <StyledForm direction="column" >
      {
        data.map((element) => {
          return (<Fragment key={element.name}>{renderElement(element)}</Fragment>)
        })
      }
    </StyledForm>
  )
}

export default Form
