import styled from "@emotion/styled"
import { PageProps } from '../typings'
import { Container } from '.'

const StyledPage = styled(Container)`
`

export const Page = ( {children}: PageProps ) => {
  return (
    <StyledPage className='page'>
      {children}
    </StyledPage>
  )
}


