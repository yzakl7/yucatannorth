import { createAsyncThunk } from '@reduxjs/toolkit'

const getMainData = createAsyncThunk(
  'userManager/getMainData',
  async (params: void, { rejectWithValue, dispatch }) => {
    try {
      
      return {  }
    } catch (err) {
      if (!(err as Record<string, string>).response) {
        throw err
      }
      return rejectWithValue(err)
    }
  },
)

const userManagerActions = {
  getMainData,
}

export default userManagerActions
