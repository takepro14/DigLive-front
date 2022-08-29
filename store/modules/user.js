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
    console.log(otherFollowers)
    state.user.passive_relationships = otherFollowers
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
      .then((res) => {
        console.log('resは: ' + JSON.stringify(res))
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
  }
}
