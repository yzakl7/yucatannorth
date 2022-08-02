import actions from './actions'

const userManagerOperations = {
  getSparePartList: actions.getSparePartList,
  getSparePartItem: actions.getSparePartItem,
  createSparePartItem: actions.createSparePartItem,
  deleteSparePartItem: actions.deleteSparePartItem,
  updateSparePartItem: actions.updateSparePartItem,
  clearSparePartList: actions.clearSparePartList,
  clearSelectedSparePart: actions.clearSelectedSparePart
}

export default userManagerOperations
