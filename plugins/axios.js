export default ({ $axios }) => {
  // リクエストのログ
  $axios.onRequest((config) => {
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
