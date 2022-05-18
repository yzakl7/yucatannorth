import { createReducer, SerializedError } from '@reduxjs/toolkit'
import actions from './actions'

export type AuthState = {
  user?: any
  isFetching: boolean
  token: Record<string, string>
  error?: SerializedError
}

const initialState: AuthState = {
  user: undefined,
  isFetching: false,
  token: {},
  error: undefined,
}

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.logIn.pending, (state) => {
      state.isFetching = true
    })
    .addCase(actions.logIn.fulfilled, (state, action) => {
      console.log({action})
      state.isFetching = false
      state.user = action.payload.user
      state.error = undefined
    })
    .addCase(actions.logIn.rejected, (state, action) => {
      state.isFetching = false
      state.user = undefined
      state.error = action.error
    })
    .addCase(actions.setUser, (state, action) => {
      state.isFetching = false
      state.user = action.payload
    })

    .addCase(actions.logOut.fulfilled, (state) => {
      state.isFetching = false
      state.user = undefined
      state.error = undefined
    })
})

export default authReducer
