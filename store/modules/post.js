////////////////////////////////////////////////////////////////////////////////////////////////////
// state
////////////////////////////////////////////////////////////////////////////////////////////////////
export const state = {
  // ---------- /home/投稿/最新 ----------
  page: 2,
  posts: [],
  // ---------- /home/投稿/フォロー ----------
  followedPage: 1,
  followedPosts: [],
  // ---------- /posts/:id ----------
  post: {},
  // ---------- /users/id/投稿 ----------
  userPostsPage: 1,
  userPosts: [],
  // ---------- /users/id/いいね ----------
  userLikesPage: 1,
  userLikes: []
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// getters
////////////////////////////////////////////////////////////////////////////////////////////////////
export const getters = {
  // ---------- /home/投稿/最新 ----------
  page (state) {
    return state.page
  },
  posts (state) {
    return state.posts
  },
  // ---------- /home/投稿/フォロー ----------
  followedPage (state) {
    return state.followedPage
  },
  followedPosts (state) {
    return state.followedPosts
  },
  // ---------- /posts/:id ----------
  post (state) {
    return state.post
  },
  // ---------- /users/id/投稿 ----------
  userPostsPage (state) {
    return state.userPostsPage
  },
  userPosts (state) {
    return state.userPosts
  },
  // ---------- /users/id/いいね ----------
  userLikes (state) {
    return state.userLikes
  },
  userLikesPage (state) {
    return state.userLikesPage
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// mutations
////////////////////////////////////////////////////////////////////////////////////////////////////
export const mutations = {
  // ==================================================
  // ローディング処理
  // ==================================================
  // ---------- /home/投稿/最新 ----------
  setPage (state) {
    state.page += 1
  },
  setPosts (state, payload) {
    state.posts.push(...payload)
  },
  // ---------- /home/投稿/フォロー ----------
  setFollowedPage (state) {
    state.followedPage += 1
  },
  setFollowedPosts (state, payload) {
    state.followedPosts.push(...payload)
  },
  // ---------- /posts/:id ----------
  setPost (state, payload) {
    state.post = payload
  },
  // ---------- /users/id/投稿 ----------
  setUserPostsPage (state) {
    state.userPostsPage += 1
  },
  setUserPosts (state, payload) {
    state.userPosts.push(...payload)
  },
  // ---------- /users/id/いいね ----------
  setUserLikesPage (state) {
    state.userLikesPage += 1
  },
  setUserLikes (state, payload) {
    state.userLikes.push(...payload)
  },
  // ==================================================
  // リセット処理
  // ==================================================
  setPostClear (state) {
    state.post = {}
  },
  setUserClear (state) {
    state.userPosts = []
    state.userPostsPage = 1
  },
  setPostForPosts (state, payload) {
    state.posts.unshift(payload)
  },
  // ==================================================
  // 即時リロード処理
  // ==================================================
  reloadCommentsByCreateComment (state, payload) {
    state.post.comments.push(payload)
  },
  reloadCommentsByDestroyComment (state, payload) {
    state.post.comments = state.post.comments.filter(comment => comment.id !== payload)
  },
  // reloadPostsByCreatePost (state, payload) {
  //   state.posts.push(payload)
  // },
  reloadPostsByDestroyPost (state, payload) {
    // ----- 共通処理 -----
    const idx = state.posts.findIndex((post) => { return post.id === payload })
    if (idx !== -1) {
      state.posts.splice(idx, 1)
    }
  },
  reloadPostByLikePost (state, payload) {
    // ----- 個別処理 -----
    if (payload.route.includes('posts')) {
      state.post.isLiked = true
      state.post.likes.push(payload.likeObj)
    } else if (payload.route.includes('users')) {
      // 投稿タブ想定
      const idxPosts = state.userPosts.findIndex((post) => { return post.id === payload.postObj.id })
      if (idxPosts !== -1) {
        state.userPosts[idxPosts].isLiked = true
        state.userPosts[idxPosts].likes.push(payload.likeObj)
      }
      // いいねタブ想定
      const idxLikes = state.userLikes.findIndex((post) => { return post.id === payload.postObj.id })
      if (idxLikes !== -1) {
        state.userLikes[idxLikes].isLiked = true
        state.userLikes[idxLikes].likes.push(payload.likeObj)
      }
    }
    // ----- 共通処理 -----
    const idx = state.posts.findIndex((post) => { return post.id === payload.postObj.id })
    // idx === -1すなわち見つからなかった時は無限スクロール前のデータなので問題ない
    if (idx !== -1) {
      state.posts[idx].isLiked = true
      state.posts[idx].likes.push(payload.likeObj)
    }
  },
  reloadPostByUnLikePost (state, payload) {
    // ----- 個別処理 -----
    if (payload.route.includes('posts')) {
      state.post.isLiked = false
      const otherLikes = state.post.likes.filter((like) => { return like.user_id !== payload.likeObj.user_id })
      state.post.likes = otherLikes
    } else if (payload.route.includes('users')) {
      // 投稿タブ想定
      const idxPosts = state.userPosts.findIndex((post) => { return post.id === payload.postObj.id })
      if (idxPosts !== -1) {
        state.userPosts[idxPosts].isLiked = false
        const otherPosts = state.userPosts[idxPosts].likes.filter((like) => { return like.user_id !== payload.likeObj.user_id })
        state.userPosts[idxPosts].likes = otherPosts
      }
      // いいねタブ想定
      const idxLikes = state.userLikes.findIndex((post) => { return post.id === payload.postObj.id })
      if (idxLikes !== -1) {
        state.userLikes[idxLikes].isLiked = false
        const otherLikes = state.userLikes[idxLikes].likes.filter((like) => { return like.user_id !== payload.likeObj.user_id })
        state.userLikes[idxLikes].likes = otherLikes
      }
    }
    // ----- 共通処理 -----
    const idx = state.posts.findIndex((post) => { return post.id === payload.postObj.id })
    if (idx !== -1) {
      state.posts[idx].isLiked = false
      const otherLikes = state.posts[idx].likes.filter((like) => { return like.user_id !== payload.likeObj.user_id })
      state.posts[idx].likes = otherLikes
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// actions
////////////////////////////////////////////////////////////////////////////////////////////////////
export const actions = {
  // ==================================================
  // ローディング処理
  // ==================================================
  getPage ({ commit }) {
    commit('setPage')
  },
  getPosts ({ rootState, commit }, postsObj) {
    postsObj.forEach((post) => {
      let likedUserIds = []
      likedUserIds = post.likes.map((like) => { return like.user_id })
      post.isLiked = likedUserIds.includes(rootState.user.current.id)
    })
    commit('setPosts', postsObj)
  },
  getFollowedPage ({ commit }) {
    commit('setFollowedPage')
  },
  getFollowedPosts ({ rootState, commit }, postsObj) {
    postsObj.forEach((post) => {
      let likedUserIds = []
      likedUserIds = post.likes.map((like) => { return like.user_id })
      post.isLiked = likedUserIds.includes(rootState.user.current.id)
    })
    commit('setFollowedPosts', postsObj)
  },
  getUserPostsPage ({ commit }) {
    commit('setUserPostsPage')
  },
  getUserPosts ({ rootState, commit }, postsObj) {
    postsObj.forEach((post) => {
      let likedUserIds = []
      likedUserIds = post.likes.map((like) => { return like.user_id })
      post.isLiked = likedUserIds.includes(rootState.user.current.id)
    })
    commit('setUserPosts', postsObj)
  },
  getUserLikesPage ({ commit }) {
    commit('setUserLikesPage')
  },
  getUserLikes ({ rootState, commit }, postsObj) {
    postsObj.forEach((post) => {
      let likedUserIds = []
      likedUserIds = post.likes.map((like) => { return like.user_id })
      post.isLiked = likedUserIds.includes(rootState.user.current.id)
    })
    commit('setUserLikes', postsObj)
  },
  // 確認中
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
  getPost ({ rootState, commit }, postObj) {
    // いいね状態のフラグ追加
    const likedUserIds = postObj.likes.map((like) => {
      return like.user_id
    })
    postObj.isLiked = likedUserIds.includes(rootState.user.current.id)
    commit('setPost', postObj)
  },
  getUserPostsClear ({ commit }) {
    commit('setUserClear')
  },
  // ==================================================
  // 各種アクション時処理
  // ==================================================
  async createPost ({ commit }, params) {
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
  getPostClear ({ commit }) {
    commit('setPostClear')
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
  }
}
