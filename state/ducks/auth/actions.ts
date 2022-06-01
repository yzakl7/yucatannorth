import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import * as firebase from 'firebase/app'
import firebaseConfig from '../../../firebase/firebaseConfig';

let firebaseApp

if (firebase.getApps().length === 0) {
  firebaseApp = firebase.initializeApp(firebaseConfig)
} else {
  firebaseApp = firebase.getApp()
}



const auth = getAuth();

const logOut = createAsyncThunk('auth/logOut', async (params: void) => {
  await auth.signOut()
  return {}
})

const setUser = createAction(
  'auth/setUser',
  (user:Record<string, string>) => {
    return {
      payload: user
    }
  },
)

const logIn = createAsyncThunk(
  'auth/logIn',
  async (params: Record<string, string>, { rejectWithValue, dispatch }) => {
    const { userName, password } = params
    try {
      await setPersistence(auth, browserLocalPersistence)
      const { user } = await signInWithEmailAndPassword(auth, userName, password)
      return { user }
    } catch (err) {
      if (!(err as Record<string, string>).response) {
        throw err
      }
      return rejectWithValue(err)
    }
  },
)

const authActions = {
  logOut,
  logIn,
  setUser
}

export default authActions
