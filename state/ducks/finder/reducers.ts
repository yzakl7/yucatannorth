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

const finderReducer = createReducer(initialState, (builder) => {
  builder
   
})

export default finderReducer
