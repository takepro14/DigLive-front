import jwtDecode from 'jwt-decode'

// 認証業務のロジックを集約するクラス(login/logout.vueからはメソッドを呼び出すだけ)
class Authentication {
  constructor (ctx) {
    this.store = ctx.store
    this.$axios = ctx.$axios
  }

  get token () {
    return this.store.state.auth.token
  }

  get expires () {
    return this.store.state.auth.expires
  }

  get payload () {
    return this.store.state.auth.payload
  }

  get user () {
    return this.store.state.user.current || {}
  }

  // 認証情報をVuexに保存する
  setAuth ({ token, expires, user }) {
    const exp = expires * 1000
    const jwtPayload = (token) ? jwtDecode(token) : {}
    this.store.dispatch('getAuthToken', token)
    this.store.dispatch('getAuthExpires', exp)
    this.store.dispatch('getCurrentUser', user)
    this.store.dispatch('getAuthPayload', jwtPayload)
  }

  login (response) {
    this.setAuth(response)
  }

  resetVuex () {
    this.store.dispatch('getDefaultState')
    this.store.dispatch('modules/post/getDefaultState')
    this.store.dispatch('modules/user/getDefaultState')
    this.store.dispatch('modules/genre/getDefaultState')
    this.store.dispatch('modules/tag/getDefaultState')
  }

  // axiosのレスポンス401を許容
  // Doc: https://github.com/axios/axios#request-config
  resolveUnauthorized (status) {
    return (status >= 200 && status < 300) || (status === 401)
  }

  async logout () {
    // ゲストユーザーはログイン時に一時作成し、ログアウト時に削除するため
    if (this.user.name === 'ゲストユーザー') {
      this.store.dispatch('modules/user/destroyAccountGuest')
    }
    await this.$axios.$delete(
      '/api/v1/auth_token',
      { validateStatus: status => this.resolveUnauthorized(status) }
    )
    this.resetVuex()
  }

  // 有効期限内の場合はtrue
  isAuthenticated () {
    return new Date().getTime() < this.expires
  }

  // ユーザーが存在している場合はtrue
  isExistUser () {
    return this.user.sub && this.payload.sub && this.user.sub === this.payload.sub
  }

  // ユーザーが存在し、かつ有効期限切れの場合にtrue
  isExistUserAndExpired () {
    return this.isExistUser() && !this.isAuthenticated()
  }

  // ユーザーが存在し、かつ有効期限内の場合にtrue
  loggedIn () {
    return this.isExistUser() && this.isAuthenticated()
  }
}

export default ({ store, $axios }, inject) => {
  inject('auth', new Authentication({ store, $axios }))
}
