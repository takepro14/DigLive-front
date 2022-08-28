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
  setIsFollowedTrue (state) {
    state.user.isFollowed = true
  },
  setIsFollowedFalse (state) {
    state.user.isFollowed = false
  }
}

export const actions = {
  async getUser ({ commit, rootState }, userId) {
    await this.$axios.$get(`/api/v1/users/${userId}`)
      .then((user) => {
        // console.log('userは: ' + JSON.stringify(user))
        // -- フォロー済みユーザかのチェック --
        // 当ユーザのフォロワーを配列で取得
        const followersId = user.passive_relationships.map((passiveRelationship) => {
          return passiveRelationship.follower_id
        })
        user.isFollowed = followersId.includes(rootState.user.current.id)
        return user
      })
      .then((user) => {
        commit('setUser', user)
      })
  },
  emitSetUserClear ({ commit }) {
    commit('setUserClear')
  },
  async follow ({ commit }, userId) {
    await this.$axios.$post('/api/v1/relationships', {
      user_id: userId
    })
      .then(() => {
        commit('setIsFollowedTrue')
      })
  },
  async unfollow ({ commit }, userId) {
    await this.$axios.$delete(`/api/v1/relationships/${userId}`, {
      params: {
        user_id: userId
      }
    })
      .then(() => {
        commit('setIsFollowedFalse')
      })
  }
}
