import styled from 'styled-components'
import { ReactNode, useRef, useState } from 'react'
import { Container } from '.';
import { getColor, useClickOutside } from '../../utils';
const StyledDropDown = styled(Container)`
  position: absolute;
  width: 100%;
  .dropdown-body {
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    background: white;
    position: absolute;
    top: calc(100% + 8px);
    border: 1px solid ${getColor('border')};
    transition: ease-in-out all .3s;
    &.expanded {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }
    &.collapsed {
      visibility: hidden;
      opacity: 0;
      transform: translateY(-8px);
    }
  }
`

export function Dropdown({
  isExpanded,
  onClose,
  children,
  trigger
}: any) {
  const dropdownRef = useRef(null);
  // useClickOutside(dropdownRef, onClose)
  return (
    <StyledDropDown REF={dropdownRef} className={'dropdown'}>
      {trigger()}
      <Container className={`${isExpanded ? 'expanded' : 'collapsed'} dropdown-body`}>
        {children}
      </Container>
    </StyledDropDown>
  )
}

export default Dropdown
