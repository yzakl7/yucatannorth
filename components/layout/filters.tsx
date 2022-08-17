import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { hooks, settingsSelectors } from '../../state'
import { Container, Dropdown, Text } from '../ui'
import { v4 as uuid } from 'uuid'
import { DropdownInput, Select, TextInput } from '../inputs'
import { useEffectOnDemand } from '../../utils'

const StyledFilters = styled(Container)`
  z-index: 5;
  gap: 16px;
  width: 100%;
  .filter-contaner {
    min-height: 40px!important;
  }

  .year-input {
    .label {
      position: absolute;
      top: 4px;
      left: 16px;
      padding: 0;
      p {
        font-weight: 800;
      }
    }
  }
`

export const Filters = ({ onChange, value, noYear }:any) => {
  const { selectSettings } = settingsSelectors
  const { useAppSelector } = hooks
  const { settings } = useAppSelector(selectSettings)
  const [ values, setvalues ] = useState<any>({})
  const [ year, setYear ] = useState('')
  const onSelect = (newValue:string, cat:string) => {
    if (newValue) {
      setvalues({...values, [cat]: newValue === 'delete' ? '' : newValue })
    } else {
      
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
      onChange({...newFilters, year})
    }
  }, [values, year])

  const renderFilters = () => {

    const obj = settings && Object.keys(values).map((cat:any, i:number) => {
      return ({
        cat,
        value: values[cat],
        onSelect: (newValue:any) => onSelect(newValue, cat),
        options: settings.categories[cat].options,
        order: settings.categories[cat].order,
        label: settings.categories[cat].label,
        zIndex: Object.keys(settings.categories).length - i,
      })
    })
    const compare = (a:any, b:any) => {
      if (Number(a.order) < Number(b.order)) {
        return -1
      }
      if (Number(a.order) > Number(b.order)) {
        return 1
      }

      return 0
    }

    const sortedObj = obj?.sort(compare)
    return sortedObj?.map((params:any) => {
      const {
        cat,
        value,
        onSelect:paramsOnselect,
        options,
        order,
        zIndex,
        label
      } = params
      const sortedOptions:any = [...options].sort((a:any, b:any) => a.toUpperCase().localeCompare(b.toUpperCase()))
      return (
        <Container className='filter-contaner' key={cat} zIndex={`${(Number(sortedObj.length) * 10) - Number(order)}`}>
          <Select label={label} value={value} onChange={paramsOnselect} options={sortedOptions}/>
        </Container>
      )
    })
  }

  return (
    <StyledFilters>
      {
        renderFilters()
      }
      {
        !noYear && (
          <Container className='year-input'>
            <TextInput label='Año' value={year} onChange={(e) => setYear(e.target.value)} />
          </Container>
        )
      }
    </StyledFilters>
  )
}
export default Filters