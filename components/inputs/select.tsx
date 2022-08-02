import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TextInput } from '.'
import { getColor } from '../../utils/theme'
import { SelectProps } from '../typings'
import { Container, Dropdown, Text } from '../ui'

const StyledSelect = styled(Container)`
  height: 100%;
  outline: none;
  .text-input {
    input {
      width: 100%;
    }
  }
  .option {
    padding: 16px;
    &:hover {
      background: rgba(0,0,0,.2);
    }
  }
  .label-container {
    position: absolute;
    padding-left: 16px;
    padding-top: 4px;
    p {
      font-size: 11px;
      font-weight: 800;
    }
  }
`


export const Select = ({
  value,
  options,
  label,
  onChange = () => null,
}: SelectProps) => {
  const [expandDropdown, setExpandDropdown] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [fitleredOptions, setFitleredOptions] = useState(options)
  const [isFocused, setIsFocused] = useState(false)
  // return <select style={{maxWidth: '250px'}} key={cat}>
  //         {
  //           settings.categories[cat].options?.map((opt:any) => (
  //             <option key={opt}>
  //                 {opt}
  //               </option>
  //             )) 
  //         }
  //       </select>

  useEffect(() => {
    if (!searchValue) {
      setFitleredOptions(options)
    } else {
      const newOptions  = (options as any).filter((opt:any) => {

        return opt.toLowerCase().indexOf(`${searchValue}`.toLowerCase()) !== -1

      })
      setFitleredOptions(newOptions)
    }

  }, [searchValue])

  useEffect(() => {
    setExpandDropdown(isFocused)
    if (!isFocused) {
      setTimeout(() => {
        
        setSearchValue('')
      }, 1000);
    }
  }, [isFocused])
  
  
  return (
    <StyledSelect>
      
      <Dropdown
        isExpanded={expandDropdown}
        trigger={()=> (
          <TextInput
            onChange={({target}) => setSearchValue(target.value)}
            value={isFocused ? searchValue : value}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
          />
        )}
        onClose={() => setExpandDropdown(false)}
      >
        
        {
          fitleredOptions?.map((opt:any) => (
            <Container
              className='option'
              key={opt}
              onClick={() => onChange(opt)}
            >
              {opt}
            </Container>
          )) 
        }
      </Dropdown>
      <Container className='label-container'>
        <Text textType='p'>
          {label }
        </Text>
      </Container>
    </StyledSelect>
  )
}

export default Select
