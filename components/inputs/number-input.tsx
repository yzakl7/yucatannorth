import { useEffect, useRef, useState } from 'react'
import styled from "@emotion/styled"
import { Container, Text } from '../ui'
import { NumberInputProps, StyledProps } from '../typings'


const StyledNumberInput = styled(Container)`
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
        border-color: red;
        p {
          color: red;
        }
      }
    }
  }
`

const StyledSharedTextAreaInput = styled.textarea`
  outline: none;
  padding: 9px;
  box-sizing: border-box;

  width: 100%;
  border: 1px solid;
  &:not(.bordered ) {
    border: none;
  }
`

export const NumberInput = (data: NumberInputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setmessage] = useState('')
  const [messageType, setmessageType] = useState('')
  const [messageHeight, setMessageHeight] = useState(0)
  const [shouldShowMessage, setShouldShowMessage] = useState(false)

  const {
    value,
    bordered = false,
    placeholder,
    isRequired,
    validation,
    messageOverride,
    onChange: propsOnChange = () => ({value: '', isValid: false}),
  } = data

  const messageRef = useRef<HTMLInputElement>(null);
  
  const resetErrorState = () => {
    setShouldShowMessage(false)
    setTimeout(() => {
      if (!shouldShowMessage) {
        setmessage('')
      }
    }, 300);
  }
  
  const validate = (val?:string) => {
    const validations = {
      isEmail: () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValid = re.test(String(val).toLowerCase());
        const text = isValid ? '' : 'Invalid email format'
        const type = isValid ? '' : 'error'
        return { isValid, type, text }
      }
    }

    if ( validation ) {
      let isValid:boolean
      let type:string
      let text:string

      if (typeof validation === 'string') {
        isValid = validations[validation]().isValid
        type = validations[validation]().type
        text = validations[validation]().text
      } else {
        isValid = validation(val).isValid
        type = validation(val).type
        text = validation(val).text
      }
      setShouldShowMessage(!isValid)
      if (!isValid) {
        setmessageType(type) 
        setmessage(text)
        return isValid
      }
    }

    resetErrorState()
    return true
  }

  const setIsRequiredError = () => {
    setmessageType('error')
    setmessage('Required field')
    setShouldShowMessage(true)
  }

  const checkIsValid = (val?:string) => {
    if (isRequired && !val) {
      setIsRequiredError()
      return false
    }
    return validate(val)
  }

  const onBlur = () => {
    checkIsValid(value)
  }

  const onChange = (val:string) => {
    propsOnChange({value:val, isValid: checkIsValid(val)})
  }

  useEffect(() => {
    const height = messageRef.current?.clientHeight || 0
    setMessageHeight(height || 0)
  }, [message, messageOverride])

  return (
    <StyledNumberInput
      messageHeight={`${
        messageOverride?.text
        || shouldShowMessage ? messageHeight : 0
      }`}
    >
      <label>
        <Container className="label-container">
          <Text textType="p">
            {placeholder}
          </Text>
        </Container>
        <input
          onBlur={onBlur}
          className={`${bordered ? 'bordered' : ''}`}
          value={value || ''}
          onChange={({target: {value}}) => onChange(value)}
          type='number'
        />
      </label>
      <Container className="spacer" height={`${ messageOverride?.text || shouldShowMessage ? messageHeight : 0}px`} />
      
      <Container className="message-container" flex='1' direction="column">
        <p
          ref={messageRef}
          className={`
            message
            ${messageOverride?.type || messageType}
            ${messageOverride?.text || shouldShowMessage ? 'visible' : 'hidden'}
          `}
        >
          {messageOverride ? messageOverride.text : message}
        </p>
      </Container>
    </StyledNumberInput>
  )
}

export default NumberInput
