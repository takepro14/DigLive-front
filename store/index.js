////////////////////////////////////////////////////////////////////////////////////////////////////
// state
////////////////////////////////////////////////////////////////////////////////////////////////////
const defaultState = () => {
  return {
    // ==================================================
    // 認証
    // ==================================================
    LoggedIn: {
      // 基本リダイレクト先
      homePath: {
        name: 'home'
      },
      // ログイン前にアクセスしようとしたパス
      rememberPath: {
        name: 'home',
        params: {}
      },
      // ログイン後アクセス不可ルート
      redirectPaths: [
        'index',
        'signup',
        'login'
      ]
    },
    user: {
      current: null
    },
    auth: {
      token: null,
      expires: 0,
      payload: {}
    },
    // ==================================================
    // ユーティリティ
    // ==================================================
    toast: {
      msg: null,
      color: '',
      timeout: 2000
    },
    // ==================================================
    // 通知
    // ==================================================
    notificationsPage: 1,
    notifications: [],
    notificationsUncheckedCount: 0
  }
}

export const state = () => defaultState()

////////////////////////////////////////////////////////////////////////////////////////////////////
// getters
////////////////////////////////////////////////////////////////////////////////////////////////////
export const getters = {
  // ==================================================
  // 通知
  // ==================================================
  notificationsPage (state) {
    return state.notificationsPage
  },
  notifications (state) {
    return state.notifications
  },
  notificationsUncheckedCount (state) {
    return state.notificationsUncheckedCount
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// mutations
////////////////////////////////////////////////////////////////////////////////////////////////////
export const mutations = {
  // ==================================================
  // ステート初期化
  // ==================================================
  setDefaultState (state) {
    Object.assign(state, defaultState())
  },
  // ==================================================
  // 認証
  // ==================================================
  setCurrentUser (state, payload) {
    state.user.current = payload
  },
  setAuthToken (state, payload) {
    state.auth.token = payload
  },
  setAuthExpires (state, payload) {
    state.auth.expires = payload
  },
  setAuthPayload (state, payload) {
    state.auth.payload = payload
  },
  setToast (state, payload) {
    state.toast = payload
  },
  setRememberPath (state, payload) {
    state.LoggedIn.rememberPath = payload
  },
  // ==================================================
  // 通知
  // ==================================================
  setNotificationsPage (state) {
    state.notificationsPage += 1
  },
  setNotifications (state, notificationsArray) {
    state.notifications.push(...notificationsArray)
  },
  // 未読数をSET
  setNotificationUnchecked (state, notificationUncheckedCount) {
    state.notificationsUncheckedCount = notificationUncheckedCount
  },
  // 未読数を0にSET
  setNotificationsChecked (state) {
    state.notifications.forEach((notification) => {
      notification.checked = true
    })
    state.notificationsUncheckedCount = 0
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// actions
////////////////////////////////////////////////////////////////////////////////////////////////////
export const actions = {
  // ==================================================
  // ステート初期化
  // ==================================================
  getDefaultState ({ commit }) {
    commit('setDefaultState')
  },
  // ==================================================
  // 認証
  // ==================================================
  getCurrentUser ({ commit }, user) {
    commit('setCurrentUser', user)
  },
  getAuthToken ({ commit }, token) {
    commit('setAuthToken', token)
  },
  getAuthExpires ({ commit }, expires) {
    expires = expires || 0
    commit('setAuthExpires', expires)
  },
  getAuthPayload ({ commit }, jwtPayload) {
    jwtPayload = jwtPayload || {}
    commit('setAuthPayload', jwtPayload)
  },
  getToast ({ commit }, { msg, color, timeout }) {
    color = color || 'info'
    timeout = timeout || 2000
    commit('setToast', { msg, color, timeout })
  },
  // ログイン前ユーザがアクセスしたルートを記憶する
  getRememberPath ({ state, commit }, { name, params }) {
    // ログイン前パスが渡された場合はLoggedIn.homePathに書き換える
    if (state.LoggedIn.redirectPaths.includes(name)) {
      name = state.LoggedIn.homePath.name
    }
    params = params || {}
    commit('setRememberPath', { name, params })
  },
  // ==================================================
  // 通知
  // ==================================================
  getNotificationsPage ({ commit }) {
    commit('setNotificationsPage')
  },
  async getNotifications ({ commit }, notiArray) {
    await notiArray.forEach((notiObj) => {
      // ---------- 共通処理 ----------
      notiObj.notiVisitor = `${notiObj.visitor.name} さんが`
      notiObj.notiTime = this.$moment(notiObj.created_at).format('YYYY年MM月DD日 HH時mm分')
      // ---------- アクション別処理 ----------
      switch (notiObj.action) {
        case ('follow'):
          notiObj.notiAction = 'あなたをフォローしました'
          notiObj.notiLink = notiObj.visitor ? `/users/${notiObj.visitor.id}` : '/users/#'
          break
        case ('like'):
          notiObj.notiAction = 'あなたの投稿にいいねしました'
          notiObj.notiLink = `/posts/${notiObj.post.id}`
          notiObj.notiPost = notiObj.post.content
          break
        case ('comment'): {
          notiObj.notiAction = 'あなたの投稿にコメントしました'
          notiObj.notiLink = `/posts/${notiObj.post.id}`
          notiObj.notiPost = notiObj.post.content
          const comment = notiObj.post.comments.filter((comment) => { return comment.id === notiObj.comment_id })
          notiObj.notiComment = comment.length ? comment[0].comment : '削除されたコメント'
          break
        }
      }
    })
    commit('setNotifications', notiArray)
  },
  // 未チェックの件数を取得する
  async getNotificationsUnchecked ({ commit }) {
    await this.$axios.$get('/api/v1/notifications/count_all')
      .then((count) => {
        commit('setNotificationUnchecked', count)
      })
  },
  // すべてチェック済にする
  async getNotificationsChecked ({ commit }) {
    await this.$axios.$put('api/v1/notifications/update_all')
      .then(() => {
        commit('setNotificationsChecked')
      })
  }
}
