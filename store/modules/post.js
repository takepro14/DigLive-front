export const state = {
  // home - new
  page: 1,
  posts: [],
  // home - follow
  followedPage: 1,
  followedPosts: [],
  // id
  post: {}
}

export const getters = {
  // home - new
  page (state) {
    return state.page
  },
  posts (state) {
    return state.posts
  },
  // home - follow
  followedPage (state) {
    return state.followedPage
  },
  followedPosts (state) {
    return state.followedPosts
  }
}

export const mutations = {
  // home - new
  setPage (state) {
    state.page += 1
  },
  setPosts (state, payload) {
    state.posts.push(...payload)
  },
  // home - follow
  setFollowedPage (state) {
    state.followedPage += 1
  },
  setFollowedPosts (state, payload) {
    state.followedPosts.push(...payload)
  },
  // id
  setPost (state, payload) {
    state.post = payload
  },
  setPostClear (state) {
    state.post = {}
  },
  setPostForPosts (state, payload) {
    state.posts.unshift(payload)
  },
  // reloadPostsByCreatePost (state, payload) {
  //   state.posts.push(payload)
  // },
  reloadPostsByDestroyPost (state, payload) {
    const idx = state.posts.findIndex((post) => {
      return post.id === payload
    })
    state.posts.splice(idx, 1)
  },
  reloadPostByLikePost (state, payload) {
    if (payload.route.includes('post')) {
      state.post.isLiked = true
      state.post.likes.push(payload.likeObj)
    } else {
      const idx = state.posts.findIndex((post) => {
        return post.id === payload.postObj.id
      })
      state.posts[idx].isLiked = true
      state.posts[idx].likes.push(payload.likeObj)
    }
  },
  reloadPostByUnLikePost (state, payload) {
    if (payload.route.includes('post')) {
      state.post.isLiked = false
      const otherUsersLikes = state.post.likes.filter(like =>
        like.user_id !== payload.likeObj.user_id
      )
      state.post.likes = otherUsersLikes
    } else {
      const idx = state.posts.findIndex((post) => {
        return post.id === payload.postObj.id
      })
      state.posts[idx].isLiked = false
      const otherUsersLikes = state.posts[idx].likes.filter(like =>
        like.user_id !== payload.likeObj.user_id
      )
      state.posts[idx].likes = otherUsersLikes
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
  getPage ({ commit }) {
    commit('setPage')
  },
  getFollowedPage ({ commit }) {
    commit('setFollowedPage')
  },
  getPosts ({ rootState, commit }, postsObj) {
    // いいねフラグの付与
    postsObj.forEach((post) => {
      let likedUserIds = []
      likedUserIds = post.likes.map((like) => { return like.user_id })
      post.isLiked = likedUserIds.includes(rootState.user.current.id)
    })
    // ステートへの反映
    commit('setPosts', postsObj)
  },
  getFollowedPosts ({ rootState, commit }, postsObj) {
    // いいねフラグの付与
    postsObj.forEach((post) => {
      let likedUserIds = []
      likedUserIds = post.likes.map((like) => { return like.user_id })
      post.isLiked = likedUserIds.includes(rootState.user.current.id)
    })
    // ステートへの反映
    commit('setFollowedPosts', postsObj)
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
  // 投稿詳細画面用
  getPost ({ rootState, commit }, postObj) {
    // いいね状態のフラグ追加
    const likedUserIds = postObj.likes.map((like) => {
      return like.user_id
    })
    postObj.isLiked = likedUserIds.includes(rootState.user.current.id)
    commit('setPost', postObj)
  },
  async destroyPost ({ commit }, postId) {
    await this.$axios.delete(`/api/v1/posts/${postId}`, { data: { id: postId } })
      .then(() => {
        commit('reloadPostsByDestroyPost', postId)
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: '投稿を削除しました',
          color: 'prymary',
          timeout: 10000
        })
      })
      .then(() => {
        this.app.router.push('/home')
      })
  },
  async emitReloadComments ({ commit }, postId) {
    await this.$axios.$get(`/api/v1/posts/${postId}`)
      .then((post) => {
        commit('setPost', post)
      })
  },
  emitSetPostClear ({ commit }) {
    commit('setPostClear')
  },
  // 共通
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
  }
}
