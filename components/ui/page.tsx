import styled from "@emotion/styled"
import { PageProps } from '../typings'
import { Container } from '.'

const StyledPage = styled(Container)`
  flex: 1;
`

export const Page = ( {children}: PageProps ) => {
  return (
    <StyledPage className='page' gap="0">
      {children}
    </StyledPage>
  )
}


