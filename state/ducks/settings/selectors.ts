import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const selectSettings = (state: RootState) => state.settings

const isSettingsenticatedSelector = createSelector(selectSettings, (settings:any) => {
  return !!settings
})

const settingsSelectors = {
  selectSettings,
}

export default settingsSelectors
