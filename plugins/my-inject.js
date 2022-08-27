class MyInject {
  constructor (ctx) {
    this.app = ctx.app
  }

  pageTitle (routeName) {
    const jsonPath = `pages.${routeName.replace(/-/g, '.')}`
    const title = this.app.i18n.t(jsonPath)
    return title
  }

  // 日時フォーマット変換
  format (date) {
    const dateTimeFormat = new Intl.DateTimeFormat(
      'ja', { dateStyle: 'medium', timeStyle: 'short' }
    )
    return dateTimeFormat.format(new Date(date))
  }

  // postsの動的なリンクを返すメソッド
  // ex) v-card :to="$my.postLinkTo(post.id)"
  // postLinkTo (id, name = 'posts-id') {
  //   return { name, params: { id } }
  // }

  // 引数のpost.idに応じたpostを返す
  // targetPost ({ $store }, id) {
  //   console.log('これは')
  //   console.log(this.$store.state)
  //   const post = $store.state.post.list.id[id]
  //   return { post }
  // }
}

// $my.メソッド名で呼び出せるようになる
export default ({ app }, inject) => {
  inject('my', new MyInject({ app }))
}
