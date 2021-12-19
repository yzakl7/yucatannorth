import React from 'react'
import Container from '../components/UI/style/container'
import styled from '@emotion/styled'
// import { PropertyList } from '../components/properties/property-list'
// import IconButton from '../components/UI/buttons/icon-button'
// import { AiOutlineFileAdd } from 'react-icons/ai'
// import { createNewProperty } from '../components/api/firebaseAPI'
// import { useRouter } from 'next/router'

const StyledAdmin = styled(Container)`
  flex: 1;
  .buttons-container {
    svg {
      font-size: 32px;
    }
  }
`

type AdminProps = {
  properties: []
}

// const onCreateNewProperty = async (callback: (x:string) => void) => {
//   try {
//     const id = await createNewProperty()
//     callback(`/properties/edit/${id}`)
//   } catch(error) {
//     console.log({error});
//   }
// }

const Admin = ({properties}: AdminProps) => {
  // const { push } = useRouter()

  return (
    <StyledAdmin>
      {/* <Container className="buttons-container">
        <IconButton height="50px" width="50px" onClick={() => onCreateNewProperty(push)}>
          <AiOutlineFileAdd />
        </IconButton>
      </Container>
      <PropertyList data={properties} /> */}
    </StyledAdmin>
  )
}

export default Admin