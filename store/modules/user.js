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
  // --------------------------------------------------
  // 初期ロード用
  // --------------------------------------------------
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
  // --------------------------------------------------
  // 即時反映用
  // --------------------------------------------------
  reloadUserByFollow (state, payload) {
    // ユーザ一覧画面用
    if (payload.route.includes('home')) {
      const idx = state.users.findIndex((user) => {
        return user.id === payload.userId
      })
      state.users[idx].isFollowed = true
      state.users[idx].passive_relationships.push(payload.relObj)
    // ユーザ詳細画面用
    } else if (payload.route.includes('users')) {
      state.user.isFollowed = true
      state.user.passive_relationships.push(payload.relObj)
    }
  },
  reloadUserByUnfollow (state, payload) {
    // ユーザ一覧画面用
    if (payload.route.includes('home')) {
      const idx = state.users.findIndex((user) => {
        return user.id === payload.userId
      })
      state.users[idx].isFollowed = false
      const otherFollowers = state.users[idx].passive_relationships.filter((passiveRelationship) => {
        return passiveRelationship.follower_id !== payload.currentUserId
      })
      state.users[idx].passive_relationships = otherFollowers
    // ユーザ詳細画面用
    } else if (payload.route.includes('users')) {
      state.user.isFollowed = false
      const otherFollowers = state.user.passive_relationships.filter((passiveRelationship) => {
        return passiveRelationship.follower_id !== payload.currentUserId
      })
      state.user.passive_relationships = otherFollowers
    }
  },
  reloadUserBySetProfile (state, payload) {
    state.currentUser.name = payload.name
    state.currentUser.email = payload.email
    state.currentUser.avatar.url = payload.avatar.url
  }
}

export const actions = {
  // --------------------------------------------------
  // ユーザ一覧画面用
  // --------------------------------------------------
  async getUsers ({ commit, rootState }) {
    if (!state.users.length) {
      await this.$axios.$get('/api/v1/users')
        // フォロー状態のフラグ追加
        .then((users) => {
          users.forEach((user) => {
            const followersIds = user.passive_relationships.map((passiveRelationship) => {
              return passiveRelationship.follower_id
            })
            user.isFollowed = followersIds.includes(rootState.user.current.id)
          })
          return users
        })
        .then((users) => {
          commit('setUsers', users)
        })
    }
  },
  // --------------------------------------------------
  // ユーザ詳細画面用
  // --------------------------------------------------
  emitSetUser ({ commit, rootState }, userObj) {
    // フォロー状態のフラグ追加
    const followersIds = userObj.passive_relationships.map((passiveRelationship) => {
      return passiveRelationship.follower_id
    })
    userObj.isFollowed = followersIds.includes(rootState.user.current.id)
    commit('setUser', userObj)
  },
  emitSetUserClear ({ commit }) {
    commit('setUserClear')
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
  },
  // --------------------------------------------------
  // 共通
  // --------------------------------------------------
  async getCurrentUser ({ commit, rootState }) {
    await this.$axios.$get(`/api/v1/users/${rootState.user.current.id}`)
      .then((userObj) => {
        commit('setCurrentUser', userObj)
      })
  },
  async follow ({ commit }, userIdAndRoute) {
    await this.$axios.$post('/api/v1/relationships', {
      user_id: userIdAndRoute.userId
    })
      .then((relObj) => {
        commit('reloadUserByFollow', {
          userId: userIdAndRoute.userId,
          route: userIdAndRoute.route,
          relObj
        })
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: 'ユーザをフォローしました',
          color: 'info'
        })
      })
  },
  async unfollow ({ commit, rootState }, userIdAndRoute) {
    await this.$axios.$delete(`/api/v1/relationships/${userIdAndRoute.userId}`, {
      params: {
        user_id: userIdAndRoute.userId
      }
    })
      .then(() => {
        commit('reloadUserByUnfollow', {
          userId: userIdAndRoute.userId,
          route: userIdAndRoute.route,
          currentUserId: rootState.user.current.id
        })
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: 'ユーザのフォローを解除しました',
          color: 'prymary'
        })
      })
  }
}
