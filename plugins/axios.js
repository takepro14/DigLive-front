export default ({ $axios, $auth }) => {
  // リクエストのログ
  $axios.onRequest((config) => {
    // axiosのリクエストヘッダを追加(before_action :xhr_request?を通過するため)
    config.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    if ($auth.token) {
      config.headers.common.Authorization = `Bearer ${$auth.token}`
    }
    console.log(config)
  })
  // レスポンスのログ
  $axios.onResponse((config) => {
    console.log(config)
  })
  // エラーのログ
  $axios.onError((e) => {
    console.log(e.response)
  })
}
