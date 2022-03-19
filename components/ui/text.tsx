import styled from "@emotion/styled"
import { TextProps } from '../typings'
import { Container } from '.'

const StyledText = styled(Container)`
  * {
    margin: 0;
    font-family: 'ABeeZee', sans-serif;
  }
`

export const Text = ({ children, textType }: TextProps) => {
  const textElements: any = {
    p: <p>{children}</p>,
    h1: <h1>{children}</h1>,
    h2: <h2>{children}</h2>,
    h3: <h3>{children}</h3>,
    h4: <h4>{children}</h4>,
    h5: <h5>{children}</h5>,
    span: <span>{children}</span>,
  }
  return (
    <StyledText className="text-container">
      { textElements[textType] }
    </StyledText>
  )
}
