// contexts/auth.js
import * as firebase from 'firebase/app'
import { doc, Firestore } from '@firebase/firestore';
import { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { browserLocalPersistence, getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebaseConfig from '../../firebase/firebaseConfig';
import { getFirestore, setDoc } from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore";

export const AuthContext = createContext({
  signin: (x:string,y:string) => {},
  user: {},
  signout: () => {},
  authStatus: 'loading'
});

type AuthProvideProps = {
  children: ReactNode
  user?: {}
}

let firebaseApp
if (firebase.getApps().length === 0) {
  firebaseApp = firebase.initializeApp(firebaseConfig)
} else {
  firebaseApp = firebase.getApp()
}

const auth = getAuth();

export const AuthProvider = (props:AuthProvideProps) => {
  const { children } = props
  const [user, setUser] = useState<string | null>(null)
  const [authStatus, setAuthStatus] = useState<string>("loading")

  onAuthStateChanged(auth, (user) => setCurrentUserInfo())

  const setCurrentUserInfo = async () => {
    if (auth.currentUser) {
      setUser(auth.currentUser.email)
      setAuthStatus('authenticated')
    } else {
      setAuthStatus('unAuthenticated')
      setUser(null)
    }
  }



  const signin = async (email:string, password:string) => {
    try {
      await setPersistence(auth, browserLocalPersistence)
      try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        console.log({user});
      } catch(error) {
        console.log({error});
      }
    } catch(error) {
      console.log({error});
    }
  }

  const signout = async () => {
    try {
      const response = await signOut(auth)
      console.log({response});
    } catch(error) {
      console.log({error});
    }
  }

  const contextValues:any = { authStatus, user, signin, signout }
  
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)