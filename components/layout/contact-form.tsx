import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { getColor } from '../../utils/theme'
import { Button, TextInput } from '../inputs'
import { Container, Text } from '../ui'

const StyledContactForm = styled.form`
  display: flex;
  flex-direction: column;
    gap: 16px;
  .form-row {
    flex-wrap: wrap;
    gap: 16px;
    flex-direction: row;
    .input-container {
      min-width: 250px;
    border-radius: 10px;
      flex: 1;
      overflow: hidden;
      label {
        display: flex;
        background: ${getColor('primary')};
        .text-container {
          justify-content: center;
          align-items: center;
          height: 40px;
          min-width: 75px;
          align-self: center;
          p {
            color: ${getColor('white')};
          }
        }
        &.vertical {
          flex-direction: column;
        }
        input, textarea {
          background: ${getColor('secondary')};
          border: none;
          padding: 0 8px;
          outline: none;
        }
        input {
          flex: 1;
        }
        textarea {
          height: 150px;
          resize: vertical;
        }
      }
    }
    button.custom {
      border: 1px solid;
      height: 40px;
      color: ${getColor('white')};
      background: ${getColor('success')};
      border-radius: 5px;
      &.disabled {
        background: ${getColor('border')};
      }
    }
  }
`

export const ContactForm = () => {
  const clearState = {
    name: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  }
  const [formState, setFormState] = useState(clearState)
  const [emailSentStatus, setEmailSentStatus] = useState('')
  const [isSendingEmail, setIsSendingEmail] = useState(false)

  const handleSubmit = async (e:any) => { 
    setIsSendingEmail(true)
    setEmailSentStatus('')
    e.preventDefault()
    let data = {
      ...formState
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (res.ok) {
        setFormState(clearState)
        setEmailSentStatus('success')
      } else {
        setEmailSentStatus('fail')
      }
    } catch (err) {
      setEmailSentStatus('fail')
    } finally {
      setIsSendingEmail(false)
    }
  }

  return (
    <StyledContactForm>
      <Container className='form-row'>
        <Container className='input-container'>
          <label>
            <Text textType='p'>Nombre</Text>
            <input value={formState.name} onChange={({target}) => setFormState({...formState, name: target.value})} />
          </label>
        </Container>
        <Container className='input-container'>
          <label>
            <Text textType='p'>Apellido</Text>
            <input value={formState.lastName} onChange={({target}) => setFormState({...formState, lastName: target.value})} />
          </label>
        </Container>
      </Container>
      <Container className='form-row'>
        <Container className='input-container'>
          <label>
            <Text textType='p'>Celular</Text>
            <input value={formState.phone} onChange={({target}) => setFormState({...formState, phone: target.value})} />
          </label>
        </Container>
        <Container className='input-container'>
          <label>
            <Text textType='p'>{'Correo *'}</Text>
            <input value={formState.email} onChange={({target}) => setFormState({...formState, email: target.value})} />
          </label>
        </Container>
      </Container>
      <Container className='form-row'>
        <Container className='input-container'>
          <label className='vertical'>
            <Text textType='p'>Mensaje</Text>
            <textarea value={formState.message} onChange={({target}) => setFormState({...formState, message: target.value})} />
          </label>
        </Container>
      </Container>
      <Container align='center'>
        {isSendingEmail && 'Enviando correo'}
      </Container>
      <Container align='center'>
        {emailSentStatus && (emailSentStatus === 'success' ? 'Correo enviado, ¡Nos pondremos en contacto en breve!' : 'Oops, parece que hubo un problema tratando de enviar su correo, por favor intente de nuevo.')}
      </Container>
      <Container className='form-row' justify='center'>
        <Button isDisabled={!formState.email} action={(e)=>{handleSubmit(e)}} buttonStyle='custom'>
          <Text textType='p'>
            Enviar
          </Text>
        </Button>
      </Container>
    </StyledContactForm>
  )
}

export default ContactForm