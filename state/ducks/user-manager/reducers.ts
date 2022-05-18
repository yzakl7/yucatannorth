import { createReducer, SerializedError } from '@reduxjs/toolkit'
import actions from './actions'

export type UserManagerState = {
  isFetching: boolean
  error?: SerializedError
}

const initialState: UserManagerState = {
  isFetching: false,
  error: undefined,
}

const userManagerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getMainData.pending, (state) => {
      state.isFetching = true
    })
    .addCase(actions.getMainData.rejected, (state, action) => {
      state.isFetching = false
      state.error = action.error
    })
    .addCase(actions.getMainData.fulfilled, (state) => {
      state.isFetching = false
      state.error = undefined
    })
})

export default userManagerReducer
