import { useEffect, useRef, useState } from 'react'
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri'
import styled from "@emotion/styled"
import { IconButton } from '.'
import { Container } from '../ui'
import { StyledProps, TextInputProps } from '../typings'


const StyledTextInput = styled(Container)`
  gap: 0;
  flex-direction: column;
  width: 100%;
  label {
    display: flex;
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
      width: 100%;
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

export const TextInput = ({
  placeholder,
  value,
  bordered = false,
  multiline,
  password,
  fallbackOnEmpty,
  isRequired,
  validation,
  messageOverride,
  onChange: propsOnChange = () => ({value: '', isValid: false}),
}: TextInputProps) => {
  const [message, setmessage] = useState('')
  const [messageType, setmessageType] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [messageHeight, setMessageHeight] = useState(0)
  const [shouldShowMessage, setShouldShowMessage] = useState(false)

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
      },
      isloquesae: () => {
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
    if (fallbackOnEmpty && !value?.trim()) {
      propsOnChange({value: `${fallbackOnEmpty}`, isValid: true})
      resetErrorState()
    } else {
      checkIsValid(value)
      propsOnChange({value: `${value || ''}`, isValid: checkIsValid(value)})
    }
  }

  const onChange = (val:string) => {
    const newValue = val.replace (/^\s/g, '')
    if (!password) {
      propsOnChange({value:`${newValue || ' '}`, isValid: true})
    } else {
      propsOnChange({value:`${newValue || ''}`, isValid: true})
    }
  }
  useEffect(() => {
    const height = messageRef.current?.clientHeight || 0
    setMessageHeight(height || 0)
  }, [message, messageOverride])

  if (multiline) {
    return (
      <StyledSharedTextAreaInput
        placeholder={placeholder}
        className={`${bordered ? 'bordered' : ''}`}
        value={value}
        onChange={({target: {value}}) => onChange(value)}
        rows={parseInt(multiline, 10)}
        style={{resize: 'none'}}
      />
    )
  }
  const shouldHideText = password && !showPassword
  return (
    <StyledTextInput messageHeight={`${messageOverride?.text || shouldShowMessage ? messageHeight : 0}`}>
      <label>
        <input
          onBlur={onBlur}
          placeholder={placeholder}
          className={`${bordered ? 'bordered' : ''} ${password ? 'password' : ''}`}
          value={value || ''}
          onChange={({target: {value}}) => onChange(value)}
          type={shouldHideText ? 'password' : 'text'}
        />
        {password && (
          <div style={{zIndex: 1}} >
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword 
                ? <RiEyeLine />
                : <RiEyeCloseLine />
              }
            </IconButton>
          </div>
        )}
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
    </StyledTextInput>
  )
}

export default TextInput
