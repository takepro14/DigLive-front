////////////////////////////////////////////////////////////////////////////////////////////////////
// state
////////////////////////////////////////////////////////////////////////////////////////////////////
export const state = {
  currentUser: {},
  // ---------- /home/ユーザ/最新 ----------
  page: 1,
  users: [],
  // ---------- /home/ユーザ/フォロー ----------
  followedPage: 1,
  followedUsers: [],
  // ---------- /users/:id ----------
  user: {},
  // ---------- /home/検索 ----------
  filteredUsers: []
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// getters
////////////////////////////////////////////////////////////////////////////////////////////////////
export const getters = {
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
  },
  // ---------- /home/検索 ----------
  filteredUsers (state) {
    return state.filteredUsers
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// mutations
////////////////////////////////////////////////////////////////////////////////////////////////////
export const mutations = {
  // ==================================================
  // データクリア
  // ==================================================
  setUserClear (state) {
    state.user = {}
  },
  setFilteredUsersClear (state) {
    state.filteredUsers = []
  },
  // ==================================================
  // データロード
  // ==================================================
  setCurrentUser (state, userObj) {
    state.currentUser = userObj
  },
  // ---------- /home/ユーザ/最新 ----------
  setPage (state) {
    state.page += 1
  },
  setUsers (state, usersArray) {
    state.users.push(...usersArray)
  },
  // ---------- /home/ユーザ/フォロー ----------
  setFollowedPage (state) {
    state.followedPage += 1
  },
  setFollowedUsers (state, usersArray) {
    state.followedUsers.push(...usersArray)
  },
  // ---------- /users/:id ----------
  setUser (state, userObj) {
    state.user = userObj
  },
  // ---------- /home/検索 ----------
  setFilteredUsers (state, usersArray) {
    state.filteredUsers = usersArray
  },
  // ---------- /home/検索(結果0件) ----------
  setFilteredUsersZero (state) {
    state.filteredusers = []
  },
  // ==================================================
  // フォローの即時反映
  // ==================================================
  reloadUserByFollow (state, userIdRouteRelObj) {
    // ---------- /users/:id ----------
    if (userIdRouteRelObj.route.includes('users')) {
      state.user.isFollowed = true
      state.user.passive_relationships.push(userIdRouteRelObj.relObj)
      state.currentUser.active_relationships.push(userIdRouteRelObj.relObj)
    }
    // ---------- /home/* ----------
    const userFollow = (usersContext) => {
      const idx = usersContext.findIndex((user) => {
        return user.id === userIdRouteRelObj.userId
      })
      if (idx !== -1) {
        usersContext[idx].isFollowed = true
        usersContext[idx].passive_relationships.push(userIdRouteRelObj.relObj)
        state.currentUser.active_relationships.push(userIdRouteRelObj.relObj)
      }
    }
    userFollow(state.users)
    userFollow(state.followedUsers)
    userFollow(state.filteredUsers)
    // 今フォローしたユーザはフォロータブで未ロード想定のため、オートリロード
    state.followedUsers = []
    state.followedPage = 1
  },
  reloadUserByUnfollow (state, userIdRouteCurrentId) {
    // ---------- /user/:id ----------
    if (userIdRouteCurrentId.route.includes('users')) {
      state.user.isFollowed = false
      const otherFollowers = state.user.passive_relationships.filter((pRel) => {
        return pRel.follower_id !== userIdRouteCurrentId.currentUserId
      })
      state.user.passive_relationships = otherFollowers
      const otherFollowing = state.currentUser.active_relationships.filter((aRel) => {
        return aRel.followed_id !== userIdRouteCurrentId.userId
      })
      state.currentUser.active_relationships = otherFollowing
    }
    // ---------- /home/* ----------
    const userUnFollow = (usersContext) => {
      const idx = usersContext.findIndex((user) => {
        return user.id === userIdRouteCurrentId.userId
      })
      if (idx !== -1) {
        usersContext[idx].isFollowed = false
        const otherFollowers = usersContext[idx].passive_relationships.filter((pRel) => {
          return pRel.follower_id !== userIdRouteCurrentId.currentUserId
        })
        usersContext[idx].passive_relationships = otherFollowers
        const otherFollowing = state.currentUser.active_relationships.filter((aRel) => {
          return aRel.followed_id !== userIdRouteCurrentId.userId
        })
        state.currentUser.active_relationships = otherFollowing
      }
    }
    userUnFollow(state.users)
    userUnFollow(state.followedUsers)
    userUnFollow(state.filteredUsers)
  },
  // ==================================================
  // 設定変更の即時反映
  // ==================================================
  reloadUserByChangeSettings (state, currentUserObj) {
    state.currentUser = currentUserObj
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// actions
////////////////////////////////////////////////////////////////////////////////////////////////////
export const actions = {
  // ==================================================
  // データクリア
  // ==================================================
  getUserClear ({ commit }) {
    commit('setUserClear')
  },
  getFilteredUsersClear ({ commit }) {
    commit('setFilteredUsersClear')
  },
  // ==================================================
  // データロード
  // ==================================================
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
  getUsers ({ rootState, commit }, usersArray) {
    usersArray.forEach((user) => {
      const followerIds = user.passive_relationships.map((pRel) => {
        return pRel.follower_id
      })
      user.isFollowed = followerIds.includes(rootState.user.current.id)
    })
    commit('setUsers', usersArray)
  },
  // ---------- /home/ユーザ/フォロー ----------
  getFollowedPage ({ commit }) {
    commit('setFollowedPage')
  },
  getFollowedUsers ({ rootState, commit }, usersArray) {
    usersArray.forEach((user) => {
      const followerIds = user.passive_relationships.map((pRel) => {
        return pRel.follower_id
      })
      user.isFollowed = followerIds.includes(rootState.user.current.id)
    })
    commit('setFollowedUsers', usersArray)
  },
  // ---------- /users/:id ----------
  getUser ({ commit, rootState }, userObj) {
    const followerIds = userObj.passive_relationships.map((pRel) => {
      return pRel.follower_id
    })
    userObj.isFollowed = followerIds.includes(rootState.user.current.id)
    commit('setUser', userObj)
  },
  // ---------- /home/検索 ----------
  getFilteredUsers ({ rootState, commit }, usersArray) {
    usersArray.forEach((user) => {
      const followerIds = user.passive_relationships.map((pRel) => {
        return pRel.follower_id
      })
      user.isFollowed = followerIds.includes(rootState.user.current.id)
    })
    commit('setFilteredUsers', usersArray)
  },
  // ---------- /home/検索(結果0件) ----------
  getFilteredUsersZero ({ commit }) {
    commit('setFilteredUsersZero')
  },
  // ==================================================
  // フォロー
  // ==================================================
  async follow ({ commit }, userIdRoute) {
    await this.$axios.$post('/api/v1/relationships', {
      user_id: userIdRoute.userId
    })
      .then((relObj) => {
        commit('reloadUserByFollow', {
          userId: userIdRoute.userId,
          route: userIdRoute.route,
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
  async unfollow ({ commit, rootState }, userIdRoute) {
    await this.$axios.$delete(`/api/v1/relationships/${userIdRoute.userId}`, {
      params: {
        user_id: userIdRoute.userId
      }
    })
      .then(() => {
        commit('reloadUserByUnfollow', {
          userId: userIdRoute.userId,
          route: userIdRoute.route,
          currentUserId: rootState.user.current.id
        })
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: 'ユーザのフォローを解除しました',
          color: 'prymary'
        })
      })
  },
  // ==================================================
  // 設定変更
  // ==================================================
  async changeSettings ({ commit, rootState }, { formData, config }) {
    await this.$axios.$put(`/api/v1/users/${rootState.user.current.id}`, formData, config)
      .then((currentUserObj) => {
        commit('reloadUserByChangeSettings', currentUserObj)
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: 'プロフィールを変更しました',
          color: 'info'
        })
      })
  },
  // ==================================================
  // アカウント削除
  // ==================================================
  async destroyAccount ({ rootState }) {
    await this.$axios.$delete(`/api/v1/users/${rootState.user.current.id}`)
      .then(() => {
        this.app.router.push('/logout')
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: 'アカウントを削除しました',
          color: 'info'
        })
      })
  }
}
