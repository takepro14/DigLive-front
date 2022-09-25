////////////////////////////////////////////////////////////////////////////////////////////////////
// state
////////////////////////////////////////////////////////////////////////////////////////////////////
export const state = {
  // ---------- /home/投稿/最新 ----------
  page: 1,
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
  userLikes: [],
  // ---------- /home/検索 ----------
  filteredPosts: []
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
  },
  // ---------- /home/検索 ----------
  filteredPosts (state) {
    return state.filteredPosts
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// mutations
////////////////////////////////////////////////////////////////////////////////////////////////////
export const mutations = {
  // ==================================================
  // データクリア
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
  setFilteredPostsClear (state) {
    state.filteredPosts = []
  },
  // ==================================================
  // データロード
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
  // ---------- /home/検索 ----------
  setFilteredPosts (state, postsArray) {
    state.filteredPosts = postsArray
  },
  // ---------- /home/検索(結果0件) ----------
  setFilteredPostsZero (state) {
    state.filteredPosts = []
  },
  // ==================================================
  // コメントの即時反映
  // ==================================================
  reloadCommentsByCreateComment (state, payload) {
    state.post.comments.push(payload)
  },
  reloadCommentsByDestroyComment (state, payload) {
    state.post.comments = state.post.comments.filter(comment => comment.id !== payload)
  },
  // ==================================================
  // 投稿の即時反映
  // ==================================================
  reloadPostsByCreatePost (state, payload) {
    payload.isLiked = false
    payload.likesCount = 0
    state.posts.unshift(payload)
    // followedPosts => 他人の投稿しかないので不要
    // filteredPosts, userPosts, userLikes => 都度ロードされるので不要
  },
  reloadPostsByDestroyPost (state, postId) {
    const postDestroyed = (postContext) => {
      const idx = postContext.findIndex((post) => {
        return post.id === postId
      })
      if (idx !== -1) {
        postContext.splice(idx, 1)
      }
    }
    postDestroyed(state.posts)
    postDestroyed(state.filteredPosts)
    // followedPosts => 他人の投稿しかないので不要
    // userPosts, userLikes => 都度ロードされるので不要
  },
  // ==================================================
  // いいねの即時反映
  // ==================================================
  reloadPostByLikePost (state, postObjAndLikeObj) {
    const changeLiked = (postsContext) => {
      const idx = postsContext.findIndex((post) => {
        return post.id === postObjAndLikeObj.postObj.id
      })
      if (idx !== -1) {
        postsContext[idx].isLiked = true
        postsContext[idx].likes.push(postObjAndLikeObj.likeObj)
      }
    }
    changeLiked(state.posts)
    changeLiked(state.followedPosts)
    changeLiked(state.filteredPosts)
    changeLiked(state.userPosts)
    changeLiked(state.userLikes)
  },
  reloadPostByUnLikePost (state, postObjAndLikeObj) {
    const changeUnLiked = (postsContext) => {
      const idx = postsContext.findIndex((post) => {
        return post.id === postObjAndLikeObj.postObj.id
      })
      if (idx !== -1) {
        postsContext[idx].isLiked = false
        postsContext[idx].likes = postsContext[idx].likes.filter((like) => {
          return like.user_id !== postObjAndLikeObj.likeObj.user_id
        })
      }
    }
    changeUnLiked(state.posts)
    changeUnLiked(state.followedPosts)
    changeUnLiked(state.filteredPosts)
    changeUnLiked(state.userPosts)
    changeUnLiked(state.userLikes)
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// actions
////////////////////////////////////////////////////////////////////////////////////////////////////
export const actions = {
  // ==================================================
  // データクリア
  // ==================================================
  getPostClear ({ commit }) {
    commit('setPostClear')
  },
  getUserPostsClear ({ commit }) {
    commit('setUserClear')
  },
  getFilteredPostsClear ({ commit }) {
    commit('setFilteredPostsClear')
  },
  // ==================================================
  // データロード
  // ==================================================
  // ---------- /home/投稿/最新 ----------
  getPage ({ commit }) {
    commit('setPage')
  },
  getPosts ({ rootState, commit }, postsArray) {
    postsArray.forEach((post) => {
      post.isLiked = post.likes.map((like) => {
        return like.user_id
      }).includes(rootState.user.current.id)
    })
    commit('setPosts', postsArray)
  },
  // ---------- /home/投稿/フォロー ----------
  getFollowedPage ({ commit }) {
    commit('setFollowedPage')
  },
  getFollowedPosts ({ rootState, commit }, postsArray) {
    postsArray.forEach((post) => {
      post.likesCount = post.likes.length
      post.isLiked = post.likes.map((like) => {
        return like.user_id
      }).includes(rootState.user.current.id)
    })
    commit('setFollowedPosts', postsArray)
  },
  // ---------- /users/id/投稿 ----------
  getUserPostsPage ({ commit }) {
    commit('setUserPostsPage')
  },
  getUserPosts ({ rootState, commit }, postsArray) {
    postsArray.forEach((post) => {
      post.isLiked = post.likes.map((like) => {
        return like.user_id
      }).includes(rootState.user.current.id)
    })
    commit('setUserPosts', postsArray)
  },
  // ---------- /users/id/いいね ----------
  getUserLikesPage ({ commit }) {
    commit('setUserLikesPage')
  },
  getUserLikes ({ rootState, commit }, postsArray) {
    postsArray.forEach((post) => {
      post.isLiked = post.likes.map((like) => {
        return like.user_id
      }).includes(rootState.user.current.id)
    })
    commit('setUserLikes', postsArray)
  },
  // ---------- /posts/id ----------
  getPost ({ rootState, commit }, postObj) {
    postObj.isLiked = postObj.likes.map((like) => {
      return like.user_id
    }).includes(rootState.user.current.id)
    commit('setPost', postObj)
  },
  // ---------- /home/検索 ----------
  getFilteredPosts ({ rootState, commit }, postsArray) {
    postsArray.forEach((post) => {
      post.isLiked = post.likes.map((like) => {
        return like.user_id
      }).includes(rootState.user.current.id)
    })
    commit('setFilteredPosts', postsArray)
  },
  // ---------- /home/検索(結果0件) ----------
  getFilteredPostsZero ({ commit }) {
    commit('setFilteredPostsZero')
  },
  // ==================================================
  // 投稿アクション
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
        commit('reloadPostsByCreatePost', postObj.data)
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: '投稿しました'
        })
      })
  },
  async destroyPost ({ commit }, postId) {
    await this.$axios.delete(`/api/v1/posts/${postId}`, {
      data: { id: postId }
    })
      .then(() => {
        commit('reloadPostsByDestroyPost', postId)
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: '投稿を削除しました',
          color: 'prymary',
          timeout: 4000
        })
      })
      .then(() => {
        this.app.router.push('/home')
      })
  },
  // ==================================================
  // いいねアクション
  // ==================================================
  async likePost ({ rootState, commit }, postObj) {
    await this.$axios.$post('/api/v1/likes', {
      like: {
        user_id: rootState.user.current.id,
        post_id: postObj.id
      }
    })
      .then((likeObj) => {
        commit('reloadPostByLikePost', {
          likeObj, postObj
        })
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: 'いいね！しました'
        })
      })
  },
  async unLikePost ({ rootState, commit }, postObj) {
    const idx = postObj.likes.findIndex((like) => {
      return like.user_id === rootState.user.current.id
    })
    const likeId = postObj.likes[idx].id
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
  // ==================================================
  // コメントアクション
  // ==================================================
  async emitReloadComments ({ commit }, postId) {
    await this.$axios.$get(`/api/v1/posts/${postId}`)
      .then((post) => {
        commit('setPost', post)
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
