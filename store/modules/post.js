export const state = {
  posts: [],
  post: {}
}

export const getters = {
  posts (state) {
    return state.posts
  },
  post (state) {
    return state.post
  }
}

export const mutations = {
  setPosts (state, payload) {
    state.posts = payload
  },
  setPost (state, payload) {
    state.post = payload
    console.log('payload: ' + JSON.stringify(payload))
  },
  setPostClear (state) {
    state.post = {}
  },
  // 一時的な妥協案
  setPostForPosts (state, payload) {
    state.posts.unshift(payload)
  },
  // reloadPostsByCreatePost (state, payload) {
  //   state.posts.push(payload)
  // },
  reloadPostsByDestroyPost (state, payload) {
    state.posts = state.posts.filter(post => post.id !== payload)
  },
  reloadPostByLikePost (state, payload) {
    // 投稿一覧からいいねした場合
    if (Object.keys(state.post).length === 0) {
      const targetPost = state.posts.filter(post =>
        post.id === payload.postObj.id
      )
      targetPost[0].isLiked = true
      targetPost[0].likes.push(payload.likeObj)
    // 投稿詳細からいいねした場合
    } else {
      state.post.isLiked = true
      state.post.likes.push(payload.likeObj)
    }
  },
  reloadPostByUnLikePost (state, payload) {
    // 投稿一覧からいいね解除した場合
    if (Object.keys(state.post).length === 0) {
      const targetPost = state.posts.filter(post =>
        post.id === payload.postObj.id
      )
      targetPost[0].isLiked = false
      const otherUsersLikes = targetPost[0].likes.filter(like =>
        like.user_id !== payload.likeObj.user_id
      )
      targetPost[0].likes = otherUsersLikes
    // 投稿詳細からいいね解除した場合
    } else {
      state.post.isLiked = false
      const otherUsersLikes = state.post.likes.filter(like =>
        like.user_id !== payload.likeObj.user_id
      )
      state.post.likes = otherUsersLikes
    }
  },
  reloadCommentsByCreateComment (state, payload) {
    state.post.comments.push(payload)
  },
  reloadCommentsByDestroyComment (state, payload) {
    state.post.comments = state.post.comments.filter(comment => comment.id !== payload)
  }
}

export const actions = {
  async getPosts ({ state, commit, rootState }) {
    // 一覧に戻った時、post(vuex)のオブジェクトをクリアする
    commit('setPostClear')
    if (!state.posts.length) {
      await this.$axios.$get('/api/v1/posts')
        .then((posts) => {
          posts.forEach((post) => {
            let likedUserIds = []
            likedUserIds = post.likes.map((like) => {
              return like.user_id
            })
            post.isLiked = likedUserIds.includes(rootState.user.current.id)
          })
          return posts
        })
        .then((posts) => {
          commit('setPosts', posts)
        })
    }
  },
  getPost ({ rootState, commit }, postObj) {
    // postにいいねしたuserIdの集合を取る
    const likedUserIds = postObj.likes.map((like) => {
      return like.user_id
    })
    // 集合の中にcurrentUserIdがある(いいね済の)場合にtrueのフラグを立てる
    postObj.isLiked = likedUserIds.includes(rootState.user.current.id)
    commit('setPost', postObj)
  },
  // 一時的な妥協案
  async getPostForPosts ({ commit, rootState }, postId) {
    await this.$axios.$get(`/api/v1/posts/${postId}`)
      // postへの追加処理: いいね済の場合にtrueを立てる
      .then((post) => {
        let likedUserIds = []
        likedUserIds = post.likes.map((like) => {
          return like.user_id
        })
        post.isLiked = likedUserIds.includes(rootState.user.current.id)
        return post
      })
      .then((post) => {
        commit('setPostForPosts', post)
      })
  },
  async createPost ({ commit }, params) {
    const data = new FormData()
    if (params.tags.length !== 0) {
      params.tags.forEach((tag) => {
        data.append('post[tags][]', tag.text)
      })
    }
    data.append('post[user_id]', params.userId)
    data.append('post[youtube_url]', params.youtubeUrl)
    data.append('post[content]', params.content)
    await this.$axios.post('/api/v1/posts', data)
      .then((postObj) => {
        this.dispatch('modules/post/getPostForPosts', postObj.data.id)
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: '投稿しました'
        })
      })
  },
  async destroyPost ({ commit }, postId) {
    await this.$axios.delete(`/api/v1/posts/${postId}`, { data: { id: postId } })
      .then(() => {
        commit('reloadPostsByDestroyPost', postId)
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: '投稿を削除しました',
          color: 'prymary'
        })
      })
  },
  async likePost ({ rootState, commit }, postObj) {
    await this.$axios.$post('/api/v1/likes', {
      like: {
        user_id: rootState.user.current.id,
        post_id: postObj.id
      }
    })
      .then((likeObj) => {
        commit('reloadPostByLikePost', {
          likeObj,
          postObj
        })
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: 'いいね！しました'
        })
      })
  },
  async unLikePost ({ rootState, commit }, postObj) {
    const likeId = postObj.likes.filter((like) => {
      return (like.user_id === rootState.user.current.id) && (like.post_id === postObj.id)
    })[0].id
    await this.$axios.$delete(`/api/v1/likes/${likeId}`, {
      params: { id: likeId }
    })
      .then((likeObj) => {
        commit('reloadPostByUnLikePost', {
          likeObj,
          postObj
        })
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: 'いいね！を解除しました',
          color: 'prymary'
        })
      })
  },
  async createComment ({ commit }, params) {
    const data = new FormData()
    data.append('comment[user_id]', params.userId)
    data.append('comment[post_id]', params.postId)
    data.append('comment[comment]', params.comment)
    await this.$axios.post('/api/v1/comments', data)
      .then((commentObj) => {
        commit('reloadCommentsByCreateComment', commentObj.data)
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: '投稿にコメントしました'
        })
      })
  },
  async destroyComment ({ commit }, commentId) {
    await this.$axios.delete(`/api/v1/comments/${commentId}`, { data: { id: commentId } })
      .then(() => {
        commit('reloadCommentsByDestroyComment', commentId)
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: 'コメントを削除しました',
          color: 'prymary'
        })
      })
  },
  async emitReloadComments ({ commit }, postId) {
    await this.$axios.$get(`/api/v1/posts/${postId}`)
      .then((post) => {
        commit('setPost', post)
      })
  }
}
