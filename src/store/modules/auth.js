const state = {
  authenticatedUser: null
}

const getters = {
  authenticatedUser: state => state.authenticatedUser
}

const mutations = {
  setAuthenticatedUser (state, authenticatedUser) {
    state.authenticatedUser = authenticatedUser
  }
}

const modules = {
  state,
  getters,
  mutations
}

export default modules