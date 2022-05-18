import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const selectAuth = (state: RootState) => state.auth

const isAuthenticatedSelector = createSelector(selectAuth, (auth:any) => {
  return !!auth.user
})

const authSelectors = {
  selectAuth,
  isAuthenticatedSelector
}

export default authSelectors
