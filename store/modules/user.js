export const state = {
  users: [],
  user: {},
  currentUser: {}
}

export const getters = {
  users (state) {
    return state.users
  },
  user (state) {
    return state.user
  },
  currentUser (state) {
    return state.currentUser
  }
}

export const mutations = {
  setUsers (state, payload) {
    state.users = payload
  },
  setCurrentUser (state, payload) {
    state.currentUser = payload
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
  reloadUserByUnfollow (state, payload) {
    state.user.isFollowed = false
    const otherFollowers = state.user.passive_relationships.filter((passiveRelationship) => {
      return passiveRelationship.follower_id !== payload
    })
    state.user.passive_relationships = otherFollowers
  },
  reloadUserBySetProfile (state, payload) {
    state.currentUser.name = payload.name
    state.currentUser.email = payload.email
    state.currentUser.avatar.url = payload.avatar.url
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
  async getCurrentUser ({ commit, rootState }) {
    await this.$axios.$get(`/api/v1/users/${rootState.user.current.id}`)
      .then((userObj) => {
        commit('setCurrentUser', userObj)
      })
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
      .then(() => {
        this.dispatch('getToast', {
          msg: 'ユーザをフォローしました',
          color: 'info'
        })
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
      .then(() => {
        this.dispatch('getToast', {
          msg: 'ユーザのフォローを解除しました',
          color: 'prymary'
        })
      })
  },
  async changeProfile ({ commit, rootState }, { formData, config }) {
    await this.$axios.$put(`/api/v1/users/${rootState.user.current.id}`, formData, config)
      .then((currentUserObj) => {
        commit('reloadUserBySetProfile', currentUserObj)
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: 'プロフィールを変更しました',
          color: 'info'
        })
      })
  }
}
