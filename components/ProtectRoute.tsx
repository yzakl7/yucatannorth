import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../utils/auth/authContext";
import { getColor } from "../utils/theme";
import { Button } from "./inputs";
import { Container, Text } from "./ui";

type ProtectedRouteProps = {
  children: ReactElement<any, any>
}

const StyledAuthBar = styled(Container)`
  position: sticky!important;
  z-index: 11;
  background: ${getColor('white')};
  top: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`

export const ProtectRoute = ({ children }: ProtectedRouteProps) => {
  const [ isLoading, setIsLoading ] = useState(true)
  
  const { signout } = useAuth()
  const { pathname, push } = useRouter()
  const { authStatus }  = useAuth()

  const protectedRoute = pathname === '/admin' || pathname === '/properties/edit/[id]'
  const isAuthenticated  = authStatus === "authenticated"
    
  const protectRoute = async() => {
  }
  
  useEffect(() => {
    if (!isAuthenticated && protectedRoute) {
      push('/login')
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [isAuthenticated])
  

  const authBar = (
    <StyledAuthBar>
      <Text textType="p">!Hola, Fernando!</Text>
      <Container direction="row">
        {pathname !== '/admin' && <Button action={() => push('/admin')} buttonStyle="primaryReverse"> <Text textType="p">Admin</Text></Button>}
        <Button action={signout} buttonStyle="dangerReverse"> <Text textType="p">Cerrar sesión</Text></Button>
      </Container>
    </StyledAuthBar>
  )
  
  useEffect(() => {
    protectRoute()
  }, [])

  if (!isAuthenticated && protectedRoute) {
    return <></>
  }

  return(
    <> 
      {isAuthenticated && authBar}
      {children}
    </>
  )
};
