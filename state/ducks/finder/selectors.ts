import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const selectFinder = (state: RootState) => state.finder

const finderSelectors = {
  selectFinder,
}

export default finderSelectors
