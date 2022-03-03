import styled from "@emotion/styled"
import { CheckBoxProps } from "../typings"

const StyledCheckBox = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  gap: 8px;
  min-height: 40px;
  .switch {
    min-width: 40px;
    display: none;
    & + .indicator {
      height: 24px;
      max-width: 40px;
      min-width: 40px;
      position: relative;
      &::before {
        transition: all ease-in-out .3s;
        content: "";
        background: gray;
        border-radius: 12px;
        height: 24px;
        width: 40px;
        position: absolute;
      }
      &::after {
        transition: all ease-in-out .3s;
        content: "";
        background: white;
        border-radius: 50%;
        height: 18px;
        width: 18px;
        top: 3px;
        left: 3px;
        position: absolute;
      }
    }
    &:checked {
      & + .indicator {
        &::before {
          background: #007bff;
        }
        &::after {
          transform: translateX(16px)
        }
      }
    }
  }
`

export const CheckBox = (props: CheckBoxProps ) => {
  const { children, style, onChange, value } = props
  const isText = typeof children === 'string'
  return (
    <StyledCheckBox>
      <input type="checkbox" checked={value} onChange={({target: {checked}}) => onChange && onChange(checked)} className={style || 'checkbox'} />
      { style && <div className="indicator" /> }
      { isText ? <p className="checkbox-label">{ children }</p> : { children } }
    </StyledCheckBox>
  )
}

export default CheckBox
