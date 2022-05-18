import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../auth/actions';

const auth = getAuth()

const getUserList = createAsyncThunk(
  'userManager/getUserList',
  async (params: void, { rejectWithValue, dispatch }) => {
    try {
      const users: any[] = []
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => users.push({...doc.data(), id: doc.id})); 
      return { users }
    } catch (err) {
      console.log('Error listing users:', err);
      if (!(err as Record<string, string>).response) {
        throw err
      }

      return rejectWithValue(err)
    }
  },
)

const createUser = createAsyncThunk(
  'userManager/createUser',
  async ({email, password, role="sales"}: {email:string, password:string, role:string}, { rejectWithValue, dispatch }) => {
    
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await addDoc(collection(db, "users"), {
        email,
        role,
        id: user.uid,
        active: true
      });
      dispatch(getUserList())
      return { }
    } catch (err) {
      console.log('Error adding user:', err);
      if (!(err as Record<string, string>).response) {
        throw err
      }

      return rejectWithValue(err)
    }
  },
)

const editUser = createAsyncThunk(
  'userManager/createUser',
  async ({email, password, role="sales"}: {email:string, password:string, role:string}, { rejectWithValue, dispatch }) => {
    
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await addDoc(collection(db, "users"), {
        email,
        role,
        id: user.uid
      });
      return { }
    } catch (err) {
      console.log('Error adding user:', err);
      if (!(err as Record<string, string>).response) {
        throw err
      }

      return rejectWithValue(err)
    }
  },
)


const userManagerActions = {
  getUserList,
  createUser
}

export default userManagerActions
