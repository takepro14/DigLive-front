export const state = {
  posts: [],
  post: {},
  userPosts: []
}

export const getters = {
  posts (state) {
    return state.posts
  },
  post (state) {
    return state.post
  },
  userPosts (state) {
    return state.userPosts
  }
}

export const mutations = {
  setPosts (state, payload) {
    state.posts = payload
  },
  setPost (state, payload) {
    state.post = payload
  },
  setUserPosts (state, payload) {
    state.userPosts = payload
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
    if (payload.route.includes('home')) {
      const idx = state.posts.findIndex((post) => {
        return post.id === payload.postObj.id
      })
      state.posts[idx].isLiked = true
      state.posts[idx].likes.push(payload.likeObj)
    } else if (payload.route.includes('user')) {
      const idx = state.userPosts.findIndex((post) => {
        return post.id === payload.postObj.id
      })
      state.userPosts[idx].isLiked = true
      state.userPosts[idx].likes.push(payload.likeObj)
    } else if (payload.route.includes('post')) {
      state.post.isLiked = true
      state.post.likes.push(payload.likeObj)
    }
  },
  reloadPostByUnLikePost (state, payload) {
    if (payload.route.includes('home')) {
      const idx = state.posts.findIndex((post) => {
        return post.id === payload.postObj.id
      })
      state.posts[idx].isLiked = false
      const otherUsersLikes = state.posts[idx].likes.filter(like =>
        like.user_id !== payload.likeObj.user_id
      )
      state.posts[idx].likes = otherUsersLikes
    } else if (payload.route.includes('user')) {
      const idx = state.userPosts.findIndex((post) => {
        return post.id === payload.postObj.id
      })
      state.userPosts[idx].isLiked = false
      const otherUsersLikes = state.userPosts[idx].likes.filter(like =>
        like.user_id !== payload.likeObj.user_id
      )
      state.userPosts[idx].likes = otherUsersLikes
    } else if (payload.route.includes('post')) {
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
  // ---------- 投稿一覧画面用 ----------
  async getPosts ({ state, commit, rootState }) {
    // 一覧に戻った時、post(vuex)のオブジェクトをクリアする
    commit('setPostClear')
    // いいね状態のフラグ追加
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
  // ---------- 投稿詳細画面用 ----------
  getPost ({ rootState, commit }, postObj) {
    // いいね状態のフラグ追加
    const likedUserIds = postObj.likes.map((like) => {
      return like.user_id
    })
    postObj.isLiked = likedUserIds.includes(rootState.user.current.id)
    commit('setPost', postObj)
  },
  getUserPosts ({ commit }, postsArray) {
    commit('setUserPosts', postsArray)
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
    console.log('params: ' + JSON.stringify(params))
    const data = new FormData()
    if (params.tags.length !== 0) {
      params.tags.forEach((tag) => {
        data.append('post[tags][]', tag.text)
      })
    }
    if (params.genres.length !== 0) {
      params.genres.forEach((genre) => {
        data.append('post[genres][]', genre)
        console.log(data)
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
  async likePost ({ rootState, commit }, postObjAndRoute) {
    await this.$axios.$post('/api/v1/likes', {
      like: {
        user_id: rootState.user.current.id,
        post_id: postObjAndRoute.post.id
      }
    })
      .then((likeObj) => {
        commit('reloadPostByLikePost', {
          likeObj,
          postObj: postObjAndRoute.post,
          route: postObjAndRoute.route
        })
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: 'いいね！しました'
        })
      })
  },
  async unLikePost ({ rootState, commit }, postObjAndRoute) {
    const likeId = postObjAndRoute.post.likes.filter((like) => {
      return (like.user_id === rootState.user.current.id) && (like.post_id === postObjAndRoute.post.id)
    })[0].id
    await this.$axios.$delete(`/api/v1/likes/${likeId}`, {
      params: { id: likeId }
    })
      .then((likeObj) => {
        commit('reloadPostByUnLikePost', {
          likeObj,
          postObj: postObjAndRoute.post,
          route: postObjAndRoute.route
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
