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
  },
  reloadUserByFollow (state, payload) {
    state.user.isFollowed = true
    state.user.passive_relationships.push(payload)
  },
  reloadUserByUnfollow (state, currentId) {
    state.user.isFollowed = false
    const otherFollowers = state.user.passive_relationships.filter((passiveRelationship) => {
      return passiveRelationship.follower_id !== currentId
    })
    state.user.passive_relationships = otherFollowers
  },
  reloadUserBySetAvatar (state, payload) {
    state.user.avatar.url = payload
  }
}

export const actions = {
  emitSetUser ({ commit, rootState }, userObj) {
    // ユーザ詳細で当該ユーザをフォローしているかのフラグ追加
    const followersIds = userObj.passive_relationships.map((passiveRelationship) => {
      return passiveRelationship.follower_id
    })
    userObj.isFollowed = followersIds.includes(rootState.user.current.id)
    commit('setUser', userObj)
  },
  async getUsers ({ commit }) {
    await this.$axios.$get('/api/v1/users')
      .then((users) => {
        commit('setUsers', users)
      })
  },
  emitSetUserClear ({ commit }) {
    commit('setUserClear')
  },
  async follow ({ commit }, userId) {
    await this.$axios.$post('/api/v1/relationships', {
      user_id: userId
    })
      .then((res) => {
        commit('reloadUserByFollow', res)
      })
  },
  async unfollow ({ commit, rootState }, userId) {
    await this.$axios.$delete(`/api/v1/relationships/${userId}`, {
      params: {
        user_id: userId
      }
    })
      .then(() => {
        commit('reloadUserByUnfollow', rootState.user.current.id)
      })
  },
  async changeAvatar ({ commit, rootState }, { formData, config }) {
    await this.$axios.$put(`/api/v1/users/${rootState.user.current.id}`, formData, config)
      .then((userObj) => {
        commit('reloadUserBySetAvatar', userObj.avatar.url)
      })
  }
}
