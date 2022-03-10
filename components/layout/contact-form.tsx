import styled from '@emotion/styled'
import React from 'react'
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
      color: white;
      background: green;
      border-radius: 5px;
      p {
        color: ${getColor('white')};
      }
    }
  }
`

export const ContactForm = () => {
  return (
    <StyledContactForm>
      <Container className='form-row'>
        <Container className='input-container'>
          <label>
            <Text textType='p'>Nombre</Text>
            <input />
          </label>
        </Container>
        <Container className='input-container'>
          <label>
            <Text textType='p'>Apellido</Text>
            <input />
          </label>
        </Container>
      </Container>
      <Container className='form-row'>
        <Container className='input-container'>
          <label>
            <Text textType='p'>Celular</Text>
            <input />
          </label>
        </Container>
        <Container className='input-container'>
          <label>
            <Text textType='p'>Correo</Text>
            <input />
          </label>
        </Container>
      </Container>
      <Container className='form-row'>
        <Container className='input-container'>
          <label className='vertical'>
            <Text textType='p'>Mensaje</Text>
            <textarea />
          </label>
        </Container>
      </Container>
      <Container className='form-row' justify='center'>
        <Button buttonStyle='custom'>
          Enviar
        </Button>
      </Container>
    </StyledContactForm>
  )
}

export default ContactForm