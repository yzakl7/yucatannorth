import styled from "@emotion/styled"
import { PageProps } from '../typings'
import { Container } from '.'

const StyledPage = styled(Container)`
  flex: 1;
  @media (max-width: 1024px) {
    padding-top: 42px;
  }
`

export const Page = ( {children}: PageProps ) => {
  return (
    <StyledPage className='page'>
      {children}
    </StyledPage>
  )
}


