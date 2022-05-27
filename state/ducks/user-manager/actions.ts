import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const getUserList = createAsyncThunk(
  'userManager/getUserList',
  async (params: void, { rejectWithValue, dispatch }) => {
    try {
      const { data: { users } } = await axios.get('/api/auth/getUserList');
      return ({ users })
    } catch (err) {
      if (!(err as Record<string, string>).response) {
        throw err
      }
      return rejectWithValue(err)
    }
  },
)

const createUser = createAsyncThunk(
  'userManager/createUser',
  async ({ email, password, role }: { email:string, password:string, role:string }, { rejectWithValue, dispatch }) => {
    try {
      const data = await axios.get('/api/auth/createUser', { params: { email, password, role } });
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

const updateUser = createAsyncThunk(
  'userManager/updateUser',
  async ({ email, role, uid, disabled }: { disabled?: boolean, email?:string, role?:string, uid:string }, { rejectWithValue, dispatch }) => {
    try {
      const data = await axios.get('/api/auth/updateUser', { params: { email, role, uid, disabled } });
      dispatch(getUserList())
      return { }
    } catch (err) {
      if (!(err as Record<string, string>).response) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

const deleteUser = createAsyncThunk(
  'userManager/deleteUser',
  async (uid: string, { rejectWithValue, dispatch }) => {
    try {
      const data = await axios.get('/api/auth/deleteUser', { params: { uid } });
      dispatch(getUserList())
      return { }
    } catch (err) {
      if (!(err as Record<string, string>).response) {
        throw err
      }
      return rejectWithValue(err)
    }
  }
)

const userManagerActions = {
  getUserList,
  createUser,
  updateUser,
  deleteUser
}

export default userManagerActions
