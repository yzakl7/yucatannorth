import styled from "@emotion/styled"
import { TitleBarProps } from '../typings'
import { Text, Container } from '.'

const StyledTitleBar = styled(Container)`
  align-items: center;
`

export const TitleBar = ( {title, menuComponent, direction='column'}: TitleBarProps ) => {
  return (
    <StyledTitleBar direction={direction} wrap='wrap' gap='16px' className='title-bar'>
      <Text textType='h4'>{title}</Text>
      {menuComponent && (
        <Container minWidth={direction === 'column' ? '100%' : undefined} className='menu-container' flex='1'>
          {menuComponent}
        </Container>
      )}
    </StyledTitleBar>
  )
}
