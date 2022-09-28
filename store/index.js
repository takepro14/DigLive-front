////////////////////////////////////////////////////////////////////////////////////////////////////
// state
////////////////////////////////////////////////////////////////////////////////////////////////////
export const state = {
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
  notifications: []
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// getters
////////////////////////////////////////////////////////////////////////////////////////////////////
export const getters = {
  // ==================================================
  // 通知
  // ==================================================
  notifications (state) {
    return state.notifications
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// mutations
////////////////////////////////////////////////////////////////////////////////////////////////////
export const mutations = {
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
  setNotifications (state, notifications) {
    state.notifications = notifications
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// actions
////////////////////////////////////////////////////////////////////////////////////////////////////
export const actions = {
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
  async getNotifications ({ commit }) {
    await this.$axios.$get('api/v1/notifications/')
      .then((notificationsArray) => {
        notificationsArray.forEach((notificationObj) => {
          // ユーザが削除済みの場合に文言を変更・ユーザ詳細へのリンクをスタブする
          if (!notificationObj.visitor) {
            notificationObj.visitor.name = '【削除されたユーザー】'
            notificationObj.visitor.id = '#'
          }
          switch (notificationObj.action) {
            case ('follow'): {
              notificationObj.notiVisitor = `${notificationObj.visitor.name} さんが`
              notificationObj.notiAction = 'あなたをフォローしました'
              notificationObj.notiVisitorLink = `/users/${notificationObj.visitor.id}`
              notificationObj.notiTime = this.$moment(notificationObj.created_at).format('YYYY年MM月DD日 HH時mm分')
              break
            }
            case ('like'): {
              // 投稿が削除済みの場合に投稿詳細へのリンクをスタブする
              if (!notificationObj.post) {
                notificationObj.post.id = '#'
                notificationObj.post.content = '【削除された投稿】'
              }
              notificationObj.notiVisitor = `${notificationObj.visitor.name} さんが`
              notificationObj.notiAction = 'あなたの投稿にいいねしました'
              notificationObj.notiPostLink = `/posts/${notificationObj.post.id}`
              notificationObj.notiPostContent = notificationObj.post.content
              notificationObj.notiTime = this.$moment(notificationObj.created_at).format('YYYY年MM月DD日 HH時mm分')
              break
            }
            case ('comment'): {
              // 投稿が削除済みの場合に投稿詳細へのリンクをスタブする
              if (!notificationObj.post) {
                notificationObj.post.id = '#'
                notificationObj.post.content = '【削除された投稿】'
              }
              notificationObj.notiVisitor = `${notificationObj.visitor.name} さんが`
              notificationObj.notiAction = 'あなたの投稿にコメントしました'
              notificationObj.notiPostLink = `/posts/${notificationObj.post.id}`
              notificationObj.notiPostContent = notificationObj.post.content
              const comment = notificationObj.post.comments.filter((comment) => { return comment.id === notificationObj.comment_id })
              notificationObj.notiComment = comment.length ? comment[0].comment : '【削除されたコメント】'
              notificationObj.notiTime = this.$moment(notificationObj.created_at).format('YYYY年MM月DD日 HH時mm分')
              break
            }
          }
        })
        return notificationsArray
      })
      .then((notificationsArray) => {
        console.log('notificationsArray: ' + JSON.stringify(notificationsArray))
        commit('setNotifications', notificationsArray)
      })
  }
}
