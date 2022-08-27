export const state = {
  users: [],
  user: {}
}

export const getters = {
  users (state) {
    return state.users
  },
  user (state) {
    return state.user
  }
}

export const mutations = {
  setUsers (state, payload) {
    state.users = payload
  },
  setUser (state, payload) {
    state.user = payload
  },
  setUserClear (state) {
    state.user = {}
  }
}

export const actions = {
  async getUser ({ commit }, userId) {
    console.log('getUserの中')
    await this.$axios.$get(`/api/v1/users/${userId}`)
      .then((user) => {
        commit('setUser', user)
      })
  },
  emitSetUserClear ({ commit }) {
    commit('setUserClear')
  }
}
