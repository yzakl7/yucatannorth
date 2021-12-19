import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { useAuth } from "../utils/auth/authContext";

type ProtectedRouteProps = {
  children: ReactElement<any, any>
}

export const ProtectRoute = ({ children }: ProtectedRouteProps) => {
  const [ isLoading, setIsLoading ] = useState(true)

  const { pathname, push } = useRouter()
  const { authStatus }  = useAuth()

  const protectedRoute = 
    pathname === '/admin' 
    || pathname !== '/properties/edit/[id]'
  const isRestricted =
    protectedRoute
    && authStatus === "unAuthorized"
    
  const protectRoute = async() => {
    if (isRestricted) {
      await push('/')
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    protectRoute()
  }, [])


  if (isRestricted) return <>Loading</>
  return children;
};
