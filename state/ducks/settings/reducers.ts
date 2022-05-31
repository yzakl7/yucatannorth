import { createReducer, SerializedError } from '@reduxjs/toolkit'
import actions from './actions'

export type SettingsState = {
  isFetching: boolean
  slideList?: any
  error?: SerializedError
}

const initialState: SettingsState = {
  isFetching: false,
  error: undefined,
  slideList: []
}

const settingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getSlides.pending, (state) => {
      state.isFetching = true
    })
    .addCase(actions.getSlides.rejected, (state, action) => {
      state.isFetching = false
      state.error = action.error
    })
    .addCase(actions.getSlides.fulfilled, (state,action) => {
      state.isFetching = false
      state.error = undefined
      state.slideList = action.payload.slideList
    })
    .addCase(actions.deleteSlide.pending, (state) => {
      state.isFetching = true
    })
    .addCase(actions.uploadSlide.pending, (state) => {
      state.isFetching = true
    })
})

export default settingsReducer
