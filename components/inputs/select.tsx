import styled from 'styled-components'
import { getColor } from '../../utils/theme'
import { SelectProps } from '../typings'

const StyledSelect = styled.select`
  display: flex;
  flex: 1;
  align-items: center;
  height: 100%;
  min-height: 40px;
  padding-left: 8px;
  border: 1px solid ${getColor('border')};
  outline: none;
`


export const Select = ({
  placeholder,
  value,
  options,
  range,
  disabled,
  months,
  onChange = () => null,
}: SelectProps) => {

  if (months) {
    const months = [placeholder, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return (
      <StyledSelect className='select-container' disabled={disabled} value={value} onChange={({target}) => {
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
    const rangeLength  = new Array(range[1] ? (range[1] - range[0]) : range[0]).length
    const rangeArray = new Array(rangeLength).fill(undefined).map((val,idx) => `${idx}`)
    rangeArray.unshift(placeholder || '')
    return (
      <StyledSelect disabled={disabled} value={value} onChange={(e) => {
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
    <StyledSelect style={{background: disabled ? getColor('border') : 'unset'}} disabled={disabled} value={value} onChange={(e) => onChange(`${e.target.value}`)}>
      {
        (options as Record<string, string>[])?.map(({value, name}) => (
          <option value={value} key={value}>{name}</option>
        ))
      }
    </StyledSelect>
  )
}

export default Select
