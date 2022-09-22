export const state = {
  // common
  currentUser: {},
  // /home -> users -> new
  page: 1,
  users: [],
  // /home -> users -> follow
  followedPage: 1,
  followedUsers: [],
  // /users/id
  user: {}
}

export const getters = {
  currentUser (state) {
    return state.currentUser
  },
  page (state) {
    return state.page
  },
  users (state) {
    return state.users
  },
  followedPage (state) {
    return state.followedPage
  },
  followedUsers (state) {
    return state.followedUsers
  },
  user (state) {
    return state.user
  }
}

export const mutations = {
  // ---------- ローディング処理 ----------
  setCurrentUser (state, payload) {
    state.currentUser = payload
  },
  setPage (state) {
    state.page += 1
  },
  setUsers (state, payload) {
    state.users.push(...payload)
  },
  setFollowedPage (state) {
    state.followedPage += 1
  },
  setFollowedUsers (state, payload) {
    state.followedUsers.push(...payload)
  },
  setUser (state, payload) {
    state.user = payload
  },
  setUserClear (state) {
    state.user = {}
  },
  // ---------- 即時リロード処理 ----------
  reloadUserBySetProfile (state, payload) {
    state.currentUser.name = payload.name
    state.currentUser.email = payload.email
    state.currentUser.avatar.url = payload.avatar.url
  },
  reloadUserByFollow (state, payload) {
    // 個別処理
    if (payload.route.includes('users')) {
      state.user.isFollowed = true
      state.user.passive_relationships.push(payload.relObj)
      state.currentUser.active_relationships.push(payload.relObj)
    }
    // 共通処理
    const idx = state.users.findIndex((user) => { return user.id === payload.userId })
    if (idx !== -1) {
      state.users[idx].isFollowed = true
      state.users[idx].passive_relationships.push(payload.relObj)
      state.currentUser.active_relationships.push(payload.relObj)
    }
  },
  reloadUserByUnfollow (state, payload) {
    // 個別処理
    if (payload.route.includes('users')) {
      state.user.isFollowed = false
      const otherFollowers = state.user.passive_relationships.filter((pRel) => { return pRel.follower_id !== payload.currentUserId })
      state.user.passive_relationships = otherFollowers
      const otherFollowing = state.currentUser.active_relationships.filter((aRel) => { return aRel.followed_id !== payload.userId })
      state.currentUser.active_relationships = otherFollowing
    }
    // 共通処理
    const idx = state.users.findIndex((user) => { return user.id === payload.userId })
    if (idx !== -1) {
      state.users[idx].isFollowed = false
      const otherFollowers = state.users[idx].passive_relationships.filter((pRel) => { return pRel.follower_id !== payload.currentUserId })
      state.users[idx].passive_relationships = otherFollowers
      const otherFollowing = state.currentUser.active_relationships.filter((aRel) => { return aRel.followed_id !== payload.userId })
      state.currentUser.active_relationships = otherFollowing
    }
  }
}

export const actions = {
  // ---------- ローディング処理 ----------
  async getCurrentUser ({ commit, rootState }) {
    await this.$axios.$get(`/api/v1/users/${rootState.user.current.id}`)
      .then((userObj) => {
        commit('setCurrentUser', userObj)
      })
  },
  getPage ({ commit }) {
    commit('setPage')
  },
  getUsers ({ rootState, commit }, usersObj) {
    usersObj.forEach((user) => {
      const followersIds = user.passive_relationships.map((pRel) => { return pRel.follower_id })
      user.isFollowed = followersIds.includes(rootState.user.current.id)
    })
    commit('setUsers', usersObj)
  },
  getFollowedPage ({ commit }) {
    commit('setFollowedPage')
  },
  getFollowedUsers ({ rootState, commit }, usersObj) {
    usersObj.forEach((user) => {
      const followersIds = user.passive_relationships.map((pRel) => { return pRel.follower_id })
      user.isFollowed = followersIds.includes(rootState.user.current.id)
    })
    commit('setFollowedUsers', usersObj)
  },
  getUser ({ commit, rootState }, userObj) {
    // 当ユーザをカレントユーザがフォロー済みかどうかのフラグを付与
    const followersIds = userObj.passive_relationships.map((pRel) => { return pRel.follower_id })
    userObj.isFollowed = followersIds.includes(rootState.user.current.id)
    commit('setUser', userObj)
  },
  getUserClear ({ commit }) {
    commit('setUserClear')
  },
  // ---------- 各種アクション時処理 ----------
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
