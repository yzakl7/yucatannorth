import { createReducer, SerializedError } from '@reduxjs/toolkit'
import actions from './actions'

export type UserManagerState = {
  isFetching: boolean
  users?: any
  error?: SerializedError
}

const initialState: UserManagerState = {
  isFetching: false,
  error: undefined,
}

const userManagerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getUserList.pending, (state) => {
      state.isFetching = true
    })
    .addCase(actions.getUserList.rejected, (state, action) => {
      state.isFetching = false
      state.error = action.error
    })
    .addCase(actions.getUserList.fulfilled, (state,action) => {
      state.isFetching = false
      state.error = undefined
      state.users = action.payload.users
    })

    .addCase(actions.createUser.pending, (state) => {
      state.isFetching = true
    })
    .addCase(actions.createUser.rejected, (state, action) => {
      state.isFetching = false
      state.error = action.error
    })
    .addCase(actions.createUser.fulfilled, (state) => {
      state.isFetching = false
      state.error = undefined
    })
})

export default userManagerReducer
