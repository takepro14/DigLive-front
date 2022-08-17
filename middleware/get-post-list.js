export default async ({ store, $axios }) => {
  // 投稿一覧が存在しない場合にのみ実行(ページ遷移の度に発火しないよう)
  if (!store.state.post.list.length) {
    await $axios.$get('/api/v1/posts')
      .then(posts => store.dispatch('getPostList', posts))
  }
}