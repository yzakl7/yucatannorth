import styled from "@emotion/styled"
import { Container } from "."
import { SharedModalProps, StyledModalContainerType } from "../typings"

const StyledModalContainer = styled(Container)`
  position: fixed;
  z-index: 10;
  top: 0px;
  left: 0px;
  display: flex;
  width: 100%;
  height: 100%;
  transition: all ease-in-out .3s;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  visibility: ${ ({isVisible}: StyledModalContainerType) => isVisible ? 'visible' : 'hidden'}; 
  @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
    -webkit-backdrop-filter: ${ ({isVisible}: StyledModalContainerType) => isVisible ? 'blur(3px)' : 'blur(0);'};   
    -moz-backdrop-filter: ${ ({isVisible}: StyledModalContainerType) => isVisible ? 'blur(3px)' : 'blur(0);'};   
    backdrop-filter:${ ({isVisible}: StyledModalContainerType) => isVisible ? 'blur(3px)' : 'blur(0);'};   
  }
  background: ${ ({isVisible}: StyledModalContainerType) => isVisible ? 'rgba(0,0,0,.29)' : 'rgba(0,0,0,.0)'}; 
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;

    
    flex-direction: column;
  }
  .modal {
    transition: all ease-in-out .3s;
    opacity: ${ ({isVisible}: StyledModalContainerType) => isVisible ? '1' : '0'}; 
    transform: ${ ({isVisible}: StyledModalContainerType) => isVisible ? 'translateY(0px) scale(1)' : 'translateY(55px) scale(0.9)'}; 
    border-radius: 3px;
  }
`

export const Modal = ({
  isVisible,
  content,
  dismiss
}: SharedModalProps) => {
  return (
    <StyledModalContainer isVisible={isVisible}>
      <Container className="overlay" onClick={() => dismiss()} />
      <Container className="modal">{content}</Container>
    </StyledModalContainer>
  )
}

export default Modal
