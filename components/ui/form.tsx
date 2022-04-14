
import { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Container, Text, Tooltip } from '.'
import { getColor } from '../../utils/theme'
import { CheckBox, Select, TextInput } from '../inputs'
import { CommonProps, ErrorsType, FormProps, FormStateProps, OnChangeType } from '../typings'

const StyledForm = styled(Container)`
  gap: 16px!important;
  justify-content: flex-start;
  .input-row {
    position: relative;
    align-items: stretch;
    gap: 16px;
    .row-element {
    flex-direction: row;
      position: unset;
      align-items: center;
    }
  }
  .select-container {
    gap: 0;
  }
  p {
    color: ${getColor('dark')};
    margin: 0;
  }
`

export const Form = ({ data, onChange }: FormProps) => {
  const [formState, setFormState] = useState<FormStateProps>({})

  useEffect(() => {
    const values: OnChangeType = {}
    const errors: ErrorsType = {}
    const formStateKeys = Object.keys(formState)

    formStateKeys.forEach((stat) => {
      errors[stat] = !formState[stat].isValid
      values[stat] = `${formState[stat].value || ''}`
    })

    const hasErrors = Object.keys(errors).find((el) => !!errors[el])
    onChange({ values, hasErrors: !!hasErrors })
  }, [formState])

  useEffect(() => {
    const newState: FormStateProps = {}
    const checkRequired = (arr: CommonProps[]) =>
      arr.forEach((el) => {
        if (el.array) {
          checkRequired(el.array)
        } else if (el.isRequired) {
          if (el.name) {
            newState[el.name] = {
              isValid: !!el.value,
              value: `${el.value ? el.value : ''}`,
            }
          }
        }
      })
    setFormState(newState)
    checkRequired(data)
  }, [])

  const renderInputGroup = (element: CommonProps) => {
    const { wrap, array, flex, title, label, direction = 'row'} = element
    return (
      <Container direction="column" flex={flex} key={`${label}container`}>
        {label && <Text textType='p'>{label}</Text>}
        {title && <Text textType='h3'>{title}</Text>}
        <Container direction={direction} className={`input-row`} wrap={wrap ? 'wrap' : undefined}>
          {array?.map((element: CommonProps) => <Fragment key={Math.random()}>{renderElement(element)}</Fragment>)}
        </Container>
      </Container>
    )
  }
  const renderTextInput = (element: CommonProps) => {
    const {
      minWidth,
      placeholder,
      isRequired,
      flex = '1',
      label,
      isPassword,
      isDisabled,
      validation,
      multiline,
      fallbackOnEmpty,
      type,
      name = '',
      value: elementValue = '',
    } = element
    const value = `${
      (name && formState[name] && formState[name].value) || elementValue
    }`

    return (
      <Container
        key={`${name}-${type}`}
        className="row-element"
        flex={flex}
        minWidth={minWidth}
      >
        <TextInput
          password={isPassword}
          multiline={multiline}
          isRequired={isRequired}
          fallbackOnEmpty={fallbackOnEmpty}
          bordered
          isDisabled={isDisabled}
          value={value}
          onChange={({ value, isValid }) => {
            const newFormState: typeof formState = {
              ...formState,
            }

            if (name) {
              newFormState[name] = {
                value,
                isValid,
              }
            }

            return setFormState(newFormState)
          }}
          placeholder={placeholder}
          label={label}
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
      label,
      isDisabled,
      range,
      months,
      tooltip,
      name,
      value: elementValue,
      type,
      isRequired,
    } = element
    const value = `${
      (name && formState[name] && formState[name].value) || elementValue
    }`
    return (
      <Container flex={flex} minWidth={minWidth} direction='column' className='select-container'>
        {label && <Text textType='p'>{label}</Text>}
        <Container
          key={`${name}-${type}`}
          className="row-element"
        >
          <Select
            value={value || elementValue}
            placeholder={placeholder}
            options={options}
            range={range}
            disabled={isDisabled}
            months={months}
            onChange={(value) => {
              const isValid = isRequired ? !!value : true
              const newFormState: typeof formState = {
                ...formState,
              }

              if (name) {
                newFormState[name] = {
                  value: `${value}`,
                  isValid,
                }
              }

              return setFormState(newFormState)
            }}
          />
          {tooltip && (
            <Container>
              <Tooltip text={tooltip} />
            </Container>
          )}
        </Container>
      </Container>
    )
  }
  const renderCheckBox = (element: CommonProps, isSwitch: boolean) => {
    const { flex = '1', name, type, label, value, isRequired, isHidden } = element
    return (
      <Container key={`${name}-${type}`} flex={flex} className="row-element">
        {
          !isHidden && (
            <CheckBox
              value={typeof value === 'boolean' ? value : value === 'true'}
              style={isSwitch ? 'switch' : undefined}
              onChange={(value:any) => {
                const isValid = isRequired ? !!value : true
                const newFormState: typeof formState = {
                  ...formState,
                }

                if (name) {
                  newFormState[name] = {
                    value: `${value}`,
                    isValid,
                  }
                }

                return setFormState(newFormState)
              }}
            >
              {label}
            </CheckBox>
          )
        }
      </Container>
    )
  }
  const renderTitle = (element: CommonProps) => {
    const { label, tooltip, name, type, flex } = element
    return (
      <Container key={`${name}-${type}`} flex={flex} className="input-row">
        <Container className="row-element" align="flex-end" flex={'1'}>
          <Text textType="h3">
            {label}
          </Text>
          {tooltip && <Tooltip text={tooltip} />}
        </Container>
      </Container>
    )
  }

  const renderElement = (element: CommonProps) => {
    const elements = {
      inputGroup: renderInputGroup(element),
      textInput: renderTextInput(element),
      numberInput: renderTextInput(element),
      select: renderSelect(element),
      checkBox: renderCheckBox(element, false),
      title: renderTitle(element),
      switch: renderCheckBox(element, true),
    }
    const { type } = element
    return type && elements[type]
  }
  return (
    <StyledForm className='form-container' direction="column" gap="unset">
      {data.map((element) => {
        return (
          <Fragment key={element.name}>
            {renderElement(element)}
          </Fragment>
        )
      })}
    </StyledForm>
  )
}

export default Form
