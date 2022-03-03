import styled from "@emotion/styled"
import { Container } from "."
import { ActivityIndicatorProps } from "../typings"

const StyledActivityIndicator = styled.div`
  .loader,
  .loader:after {
    border-radius: 50%;
    width: 24px;
    height: 24px;
  }
  .loader {
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 3px solid ${ ({color}) => color || 'white'};
    border-right: 3px solid ${ ({color}) => color || 'white'};
    border-bottom: 3px solid ${ ({color}) => color || 'white'};
    border-left: 3px solid transparent;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

`

export function ActivityIndicator({color}: ActivityIndicatorProps) {
  return (
    <StyledActivityIndicator color={color}>
      <Container className="loader">
        Loading...
      </Container>
    </StyledActivityIndicator>
  )
}

export default ActivityIndicator
