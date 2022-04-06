import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

type ProtectedRouteProps = {
  children: ReactElement<any, any>
}

export const ProtectRoute = ({ children }: ProtectedRouteProps) => {
  const isRestricted = false
  const [ isLoading, setIsLoading ] = useState(true)

  const { pathname, push } = useRouter()

  const protectedRoute = 
    pathname === '/admin' 
    || pathname !== '/properties/edit/[id]'

    
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
