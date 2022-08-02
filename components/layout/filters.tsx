import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { hooks, settingsSelectors } from '../../state'
import { Container, Dropdown, Text } from '../ui'
import { v4 as uuid } from 'uuid'
import { DropdownInput, Select } from '../inputs'
import { useEffectOnDemand } from '../../utils'

const StyledFilters = styled(Container)`
  z-index: 5;
  gap: 16px;
  width: 100%;
  .filter-contaner {
    min-height: 40px!important;
  }
`

export const Filters = ({ onChange, value }:any) => {
  const { selectSettings } = settingsSelectors
  const { useAppSelector } = hooks
  const { settings } = useAppSelector(selectSettings)
  const [ values, setvalues ] = useState<any>({})

  const onSelect = (newValue:string, cat:string) => {
    if (newValue) {
      setvalues({...values, [cat]: newValue})
    }
  }
  
  useEffect(() => {
    const newValues:any = {}
    if (settings) {
      Object.keys(settings?.categories).forEach( (va:any) => {
        if (va !== 'id') {
          newValues[va] = ''
        }
      });
      setvalues({...newValues, ...value})
    }
  }, [settings])

  useEffectOnDemand(() => {
    if (values) {
      const newFilters = Object.keys(values).reduce((acc:any, curr:any) => {
        if (values[curr]) {
          return ({...acc, [curr]:values[curr] })
        }
        return ({...acc})
      }, {}) 
      if (Object.keys(newFilters).length) {
        onChange(newFilters)
      }
    }
  }, [values])

  useEffect(() => {
    // console.log({filters: value});
  }, [value])
  

  const renderFilters = () => {
    return settings && Object.keys(values).map((cat:any, i:number) => {
      return (
        <Container className='filter-contaner' key={cat} zIndex={`${Object.keys(settings.categories).length - i}`}>
          <Select label={settings.categories[cat].label} value={values[cat]} onChange={(newValue) => onSelect(newValue, cat)} options={settings.categories[cat].options}/>
        </Container>
      )
        
      // return settings.categories[cat].options?.map((opt:any) => (
      //   <option key={opt}>
      //     {opt}
      //   </option>
      // ))

    })

  
  }

  return (
    <StyledFilters>
      {
        renderFilters()
      }
    </StyledFilters>
  )
}
export default Filters