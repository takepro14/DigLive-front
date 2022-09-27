////////////////////////////////////////////////////////////////////////////////////////////////////
// state
////////////////////////////////////////////////////////////////////////////////////////////////////
export const state = {
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
  // currentUserの認証情報周り情報
  user: {
    current: null
  },
  auth: {
    token: null,
    expires: 0,
    payload: {}
  },
  toast: {
    msg: null,
    color: '',
    timeout: 2000
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// getters
////////////////////////////////////////////////////////////////////////////////////////////////////
export const getters = {}

////////////////////////////////////////////////////////////////////////////////////////////////////
// mutations
////////////////////////////////////////////////////////////////////////////////////////////////////
export const mutations = {
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
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// actions
////////////////////////////////////////////////////////////////////////////////////////////////////
export const actions = {
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
  }
}
