import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const selectSpareParts = (state: RootState) => state.spareParts

const sparePartsSelectors = {
  selectSpareParts,
}

export default sparePartsSelectors
