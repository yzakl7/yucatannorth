import styled from '@emotion/styled'
import { ChangeEventHandler } from 'react'

export interface SelectProps {
  placeholder?: string,
  value?: string | number,
  onChange?: (x:string) => void,
  range?: number[],
  months?: boolean,
  options?: string[],
}

const StyledSelect = styled.select`
  display: flex;
  flex: 1;
  align-items: center;
  height: 100%;
  min-height: 40px;
  padding-left: 8px;
  outline: none;
`


export const Select = ({
  placeholder,
  value,
  options,
  range,
  months,
  onChange = () => null,
}: SelectProps) => {

  if (months) {
    const months = [placeholder, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return (
      <StyledSelect value={value} onChange={({target}) => {
        const value = `${target.value}`
        return (onChange(value))
      }}>
        {
          months.map((month, i) => (
            <option hidden={i === 0} value={i} key={month}>{month}</option>
          ))
        } 
      </StyledSelect>
    )
  }
  
  if (range) {
    const offset = range[1] ? range[1] - range[0] : range[0]
    const rangeLength  = new Array(range[1] ? (range[1] - range[0]) : range[0]).length
    const rangeArray = new Array(rangeLength).fill(undefined).map((val,idx) => `${idx}`)
    rangeArray.unshift(placeholder || '')
    return (
      <StyledSelect value={value} onChange={(e) => {
        const val = parseInt(e.target.value, 10)
        return (
          onChange(`${val}`)
        )
      }}>
        {
          rangeArray.map((el, i) => {
            const key = Math.random()
            return (
              <option
                hidden={el === placeholder}
                value={range[1] ? range[0] + i : el}
                key={key}
              >
                {
                  el === placeholder 
                    ? placeholder
                    : range[1] ? range[0] + i : el
                }
              </option>
            )
          })
        } 
      </StyledSelect>
    )
  }
  return (
    <StyledSelect value={value} onChange={(e) => onChange(`${e.target.value}`)}>
      {
        options?.map((value, key) => (
          <option value={value} key={key || value}>{value}</option>
        ))
      }
    </StyledSelect>
  )
}

export default Select
