import { createReducer, SerializedError } from '@reduxjs/toolkit'
import actions from './actions'

export type UserManagerState = {
  isFetching: boolean
  sparePartList?: any
  sparePartItem?: any
  error?: SerializedError
}

const initialState: UserManagerState = {
  isFetching: false,
  error: undefined,
  sparePartList: [],
  sparePartItem: {}
}

const userManagerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getSparePartList.pending, (state) => {
      state.isFetching = true
      state.error = undefined
    })
    .addCase(actions.getSparePartList.rejected, (state, action) => {
      state.isFetching = false
      state.error = action.error
    })
    .addCase(actions.getSparePartList.fulfilled, (state,action) => {
      state.isFetching = false
      state.error = undefined
      state.sparePartList = action.payload.sparePartList
    })
    .addCase(actions.getSparePartItem.pending, (state) => {
      state.isFetching = true
      state.error = undefined
    })
    .addCase(actions.getSparePartItem.rejected, (state, action) => {
      state.isFetching = false
      state.error = action.error
    })
    .addCase(actions.getSparePartItem.fulfilled, (state,action) => {
      state.isFetching = false
      state.error = undefined
      state.sparePartItem = action.payload.sparePartItem
    })
    .addCase(actions.clearSelectedSparePart, (state,action) => {
      state.isFetching = false
      state.error = undefined
      state.sparePartItem = undefined
    })
    .addCase(actions.clearSparePartList, (state,action) => {
      state.isFetching = false
      state.error = undefined
      state.sparePartList = undefined
    })
})

export default userManagerReducer
