////////////////////////////////////////////////////////////////////////////////////////////////////
// state
////////////////////////////////////////////////////////////////////////////////////////////////////
export const state = {
  // ---------- 共通 ----------
  currentUser: {},
  // ---------- /home/ユーザ/最新 ----------
  page: 1,
  users: [],
  // ---------- /home/ユーザ/フォロー ----------
  followedPage: 1,
  followedUsers: [],
  // ---------- /users/:id ----------
  user: {}
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// getters
////////////////////////////////////////////////////////////////////////////////////////////////////
export const getters = {
  // ---------- 共通 ----------
  currentUser (state) {
    return state.currentUser
  },
  // ---------- /home/ユーザ/最新 ----------
  page (state) {
    return state.page
  },
  users (state) {
    return state.users
  },
  // ---------- /home/ユーザ/フォロー ----------
  followedPage (state) {
    return state.followedPage
  },
  followedUsers (state) {
    return state.followedUsers
  },
  // ---------- /users/:id ----------
  user (state) {
    return state.user
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// mutations
////////////////////////////////////////////////////////////////////////////////////////////////////
export const mutations = {
  // ==================================================
  // ローディング処理
  // ==================================================
  setCurrentUser (state, payload) {
    state.currentUser = payload
  },
  // ---------- /home/ユーザ/最新 ----------
  setPage (state) {
    state.page += 1
  },
  setUsers (state, payload) {
    state.users.push(...payload)
  },
  // ---------- /home/ユーザ/フォロー ----------
  setFollowedPage (state) {
    state.followedPage += 1
  },
  setFollowedUsers (state, payload) {
    state.followedUsers.push(...payload)
  },
  // ---------- /users/:id ----------
  setUser (state, payload) {
    state.user = payload
  },
  setUserClear (state) {
    state.user = {}
  },
  // ==================================================
  // 即時リロード処理
  // ==================================================
  reloadUserBySetProfile (state, payload) {
    state.currentUser.name = payload.name
    state.currentUser.email = payload.email
    state.currentUser.avatar.url = payload.avatar.url
  },
  reloadUserByFollow (state, payload) {
    // ---------- /users/:id ----------
    if (payload.route.includes('users')) {
      state.user.isFollowed = true
      state.user.followerCount += 1
    }
    // ---------- /home/ユーザ/最新 ----------
    const idx = state.users.findIndex((user) => {
      return user.id === payload.userId
    })
    // ロード済みの場合
    if (idx !== -1) {
      state.users[idx].isFollowed = true
      state.users[idx].followerCount += 1
      // 今フォローしたユーザはフォロータブで未ロード想定のため、オートリロード
      state.followedUsers = []
      state.followedPage = 1
    }
    // ---------- /home/ユーザ/フォロー ----------
    // const idxF = state.followedUsers.findIndex((user) => {
    //   return user.id === payload.userId
    // })
    // if (idxF !== -1) {
    //   state.followedUsers[idxF].isFollowed = true
    //   state.followedUsers[idxF].followerCount += 1
    // }
  },
  reloadUserByUnfollow (state, payload) {
    // ---------- /users/:id ----------
    if (payload.route.includes('users')) {
      state.user.isFollowed = false
      state.user.followerCount -= 1
    }
    // ---------- /home/ユーザ/最新 ----------
    const idx = state.users.findIndex((user) => {
      return user.id === payload.userId
    })
    if (idx !== -1) {
      state.users[idx].isFollowed = false
      state.users[idx].followerCount -= 1
    }
    const idxF = state.followedUsers.findIndex((user) => {
      return user.id === payload.userId
    })
    if (idxF !== -1) {
      state.followedUsers[idxF].isFollowed = false
      state.followedUsers[idxF].followerCount -= 1
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// actions
////////////////////////////////////////////////////////////////////////////////////////////////////
export const actions = {
  // ==================================================
  // ローディング処理
  // ==================================================
  // ---------- 共通 ----------
  async getCurrentUser ({ commit, rootState }) {
    await this.$axios.$get(`/api/v1/users/${rootState.user.current.id}`)
      .then((userObj) => {
        commit('setCurrentUser', userObj)
      })
  },
  // ---------- /home/ユーザ/最新 ----------
  getPage ({ commit }) {
    commit('setPage')
  },
  getUsers ({ rootState, commit }, usersAry) {
    usersAry.forEach((user) => {
      user.followingCount = user.active_relationships.length
      user.followerCount = user.passive_relationships.length
      user.isFollowed = user.passive_relationships.map((pRel) => {
        return pRel.follower_id
      }).includes(rootState.user.current.id)
    })
    commit('setUsers', usersAry)
  },
  // ---------- /home/ユーザ/フォロー ----------
  getFollowedPage ({ commit }) {
    commit('setFollowedPage')
  },
  getFollowedUsers ({ rootState, commit }, usersAry) {
    usersAry.forEach((user) => {
      user.followingCount = user.active_relationships.length
      user.followerCount = user.passive_relationships.length
      user.isFollowed = user.passive_relationships.map((pRel) => {
        return pRel.follower_id
      }).includes(rootState.user.current.id)
    })
    commit('setFollowedUsers', usersAry)
  },
  // ---------- /users/:id ----------
  getUser ({ commit, rootState }, userObj) {
    userObj.followingCount = userObj.active_relationships.length
    userObj.followerCount = userObj.passive_relationships.length
    userObj.isFollowed = userObj.passive_relationships.map((pRel) => {
      return pRel.follower_id
    }).includes(rootState.user.current.id)
    commit('setUser', userObj)
  },
  getUserClear ({ commit }) {
    commit('setUserClear')
  },
  // ==================================================
  // 各種アクション時処理
  // ==================================================
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
