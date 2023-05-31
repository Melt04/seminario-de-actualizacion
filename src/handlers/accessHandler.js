class AccessHandler {
  add (resId, grpId) {
    throw new Error('Not implemented')
  }
  remove (resId, grpId) {
    throw new Error('Not implemented')
  }
  getAccessGroupByResource (resId) {
    throw new Error('Not implemented')
  }
  getAccessResourcessByGroup (grpId) {
    throw new Error('Not implemented')
  }
}

module.exports = AccessHandler
