export default ({ $auth, store, route, redirect }) => {
  // ログイン済ユーザーをリダイレクトさせる
  const redirectPaths = store.state.AfterLogin.redirectPaths
  if ($auth.loggedIn() && redirectPaths.includes(route.name)) {
    return redirect(store.state.AfterLogin.homePath)
  }
}
