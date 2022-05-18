import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const selectUserManager = (state: RootState) => state.userManager

const isUserManagerenticatedSelector = createSelector(selectUserManager, (userManager:any) => {
  return !!userManager.user
})

const userManagerSelectors = {
  selectUserManager,
  isUserManagerenticatedSelector
}

export default userManagerSelectors
