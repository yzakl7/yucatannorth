import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { authOperations, authSelectors, hooks, settingsOperations } from "../state";

type ProtectedRouteProps = {
  children: ReactElement<any, any>
}

export const ProtectRoute = ({ children }: ProtectedRouteProps) => {
  const auth = getAuth();
  const { pathname, push } = useRouter()
  const protectedRoute = pathname.toLowerCase().includes('admin')
  const isLogin = pathname === '/login'
  const { useAppSelector, useAppDispatch } = hooks
  const { selectAuth, isAuthenticatedSelector } = authSelectors
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  const isRestricted = !isAuthenticated && protectedRoute
  const authState = useAppSelector(selectAuth)

  const { getSettings } = settingsOperations

  

  const { setUser } = authOperations
  const dispatch = useAppDispatch()
  
  
  useEffect(() => {
    if (!isAuthenticated) {
      onAuthStateChanged(auth, (user: any) => {
        if (user) {
          dispatch(setUser(user))
        } else if (isRestricted && !isLogin ) {
          push('/login')
        }
      })
    }
  }, [pathname])

  useEffect(() => {
    dispatch(getSettings())
  }, [])
  
  if (isRestricted) return <>Loading</>
      
  return <>{children}</>;
};
