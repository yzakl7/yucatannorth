import { useState } from 'react'
import styled from 'styled-components'
import { getColor } from '../../utils'
import { Container, Dropdown, Text } from '../ui'

const  StyledDropdownInput = styled(Container)`
  p {
    font-size: 14px!important;
    font-weight: 400!important;
  }
  border: 1px solid ${getColor('brand')};
  background: ${getColor('white')};
  position: relative;
  border-radius: 12px;
  height: 45px;
  width: 200px;
  .trigger-container {
    gap: 8px;
    .label-container {
      position:absolute;
      top: -12px;
      left: 12px;
      background: ${getColor('white')};
      padding: 0 4px;
      p {
        font-weight: 400;
        font-size: 11px!important;
      }
    }
  }
  .options-container {
    overflow: hidden;
    background: ${getColor('white')};
    flex-direction: column;
    border-radius: 12px;
    border: 1px solid ${getColor('brand')};
    width: 200px;
    align-items: stretch;
    .role-container {
      
      &:hover {
        background: ${getColor('brandLightClear')};
      }
      p {
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
  .dropdown-body-container {
  }
`
const Arrow = styled(Container)`
  display: inline-block;
  border: solid ${getColor('grey')};
  border-width: 0 3px 3px 0;
  padding: 3px;
  transition: transform 250ms ease-in-out;
  &.down-container {
    transform: rotate(45deg);
  }

  &.up-container {
    display: inline-block;
    border: solid ${getColor('grey')};
    border-width: 0 3px 3px 0;
    padding: 3px;
    transform: rotate(-135deg);
  }
`

export const DropdownInput = ({selectedOption, onChange: onChangeProps, label, options=[]}:any) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const onClose = () => {
    setIsExpanded(false)
  }
  const onChange = (item:any) => {
    onChangeProps(item)
    onClose()
  }
  const renderTrigger = () => {
    return (
      <Container className={'trigger'} onClick={() => isExpanded ? onChange(selectedOption) : setIsExpanded(true)}> 
        {
          label && (
            <Container className={'label'}>
              <Text textType='p'>{label}</Text>
            </Container>
          )
        }
        <Text textType='p'>{selectedOption?.label}</Text>
        <Arrow className={`arrow ${!isExpanded ? 'down' : 'up'}`} />
      </Container>
    )
  }
  return (
    <StyledDropdownInput className={`dropdown-selector`}>
      <Dropdown onClose={onClose} isExpanded={isExpanded} trigger={renderTrigger}> 
        <Container className={'options'}>
          {options.map((option:Record<string, any>) =>  
            <Container key={option.key} className={'role'} onClick={() => onChange(option)}>
              <Text textType='p'>{option.label}</Text> 
            </Container>
          )}
        </Container>
      </Dropdown>
    </StyledDropdownInput>
  )
}

export default DropdownInput
