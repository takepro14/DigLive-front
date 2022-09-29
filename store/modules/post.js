////////////////////////////////////////////////////////////////////////////////////////////////////
// state
////////////////////////////////////////////////////////////////////////////////////////////////////
const defaultState = () => {
  return {
    // ---------- /home/投稿/最新 ----------
    page: 1,
    posts: [],
    // ---------- /home/投稿/フォロー ----------
    followedPage: 1,
    followedPosts: [],
    // ---------- /posts/:id ----------
    post: {},
    // ---------- /users/:id/投稿 ----------
    userPostsPage: 1,
    userPosts: [],
    // ---------- /users/:id/いいね ----------
    userLikesPage: 1,
    userLikes: [],
    // ---------- /home/検索 ----------
    filteredPosts: []
  }
}

export const state = () => defaultState()

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
  // ---------- /users/:id/投稿 ----------
  userPostsPage (state) {
    return state.userPostsPage
  },
  userPosts (state) {
    return state.userPosts
  },
  // ---------- /users/:id/いいね ----------
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
  // ステート初期化
  // ==================================================
  setDefaultState (state) {
    Object.assign(state, defaultState())
  },
  // ==================================================
  // データクリア
  // ==================================================
  setPostClear (state) {
    state.post = {}
  },
  setUserPostsClear (state) {
    state.userPosts = []
    state.userPostsPage = 1
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
  setPosts (state, postsArray) {
    state.posts.push(...postsArray)
  },
  // ---------- /home/投稿/フォロー ----------
  setFollowedPage (state) {
    state.followedPage += 1
  },
  setFollowedPosts (state, postsArray) {
    state.followedPosts.push(...postsArray)
  },
  // ---------- /posts/:id ----------
  setPost (state, postObj) {
    state.post = postObj
  },
  // ---------- /users/:id/投稿 ----------
  setUserPostsPage (state) {
    state.userPostsPage += 1
  },
  setUserPosts (state, postsArray) {
    state.userPosts.push(...postsArray)
  },
  // ---------- /users/:id/いいね ----------
  setUserLikesPage (state) {
    state.userLikesPage += 1
  },
  setUserLikes (state, postsArray) {
    state.userLikes.push(...postsArray)
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
  // 投稿の即時反映
  // ==================================================
  reloadPostsByCreatePost (state, postObj) {
    postObj.isLiked = false
    state.posts.unshift(postObj)
    // followedPosts => 他人の投稿しかないので不要
    // filteredPosts, userPosts, userLikes => /home/投稿でしか投稿はできず、都度ロードされるので不要
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
    postDestroyed(state.userLikes)
    postDestroyed(state.userPosts)
    // followedPosts => 他人の投稿しかないので不要
  },
  // ==================================================
  // いいねの即時反映
  // ==================================================
  reloadPostByLikePost (state, likeObjPostObj) {
    // ---------- /posts/:id ----------
    if (Object.keys(state.post).length) {
      state.post.isLiked = true
      state.post.likes.push(likeObjPostObj.likeObj)
    }
    // ---------- /home/* ----------
    const changeLiked = (postsContext) => {
      const idx = postsContext.findIndex((post) => {
        return post.id === likeObjPostObj.postObj.id
      })
      if (idx !== -1) {
        postsContext[idx].isLiked = true
        postsContext[idx].likes.push(likeObjPostObj.likeObj)
      }
    }
    changeLiked(state.posts)
    changeLiked(state.followedPosts)
    changeLiked(state.filteredPosts)
    changeLiked(state.userPosts)
    changeLiked(state.userLikes)
  },
  reloadPostByUnLikePost (state, likeObjPostObj) {
    // ---------- /posts/:id ----------
    if (Object.keys(state.post).length) {
      state.post.isLiked = false
      state.post.likes = state.post.likes.filter((like) => {
        return like.user_id !== likeObjPostObj.likeObj.user_id
      })
    }
    // ---------- /home/* ----------
    const changeUnLiked = (postsContext) => {
      const idx = postsContext.findIndex((post) => {
        return post.id === likeObjPostObj.postObj.id
      })
      if (idx !== -1) {
        postsContext[idx].isLiked = false
        postsContext[idx].likes = postsContext[idx].likes.filter((like) => {
          return like.user_id !== likeObjPostObj.likeObj.user_id
        })
      }
    }
    changeUnLiked(state.posts)
    changeUnLiked(state.followedPosts)
    changeUnLiked(state.filteredPosts)
    changeUnLiked(state.userPosts)
    changeUnLiked(state.userLikes)
  },
  // ==================================================
  // コメントの即時反映
  // ==================================================
  reloadCommentsByCreateComment (state, commentObj) {
    state.post.comments.push(commentObj)
  },
  reloadCommentsByDestroyComment (state, commentId) {
    state.post.comments = state.post.comments.filter(comment => comment.id !== commentId)
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// actions
////////////////////////////////////////////////////////////////////////////////////////////////////
export const actions = {
  // ==================================================
  // ステート初期化
  // ==================================================
  getDefaultState ({ commit }) {
    commit('setDefaultState')
  },
  // ==================================================
  // データクリア
  // ==================================================
  getPostClear ({ commit }) {
    commit('setPostClear')
  },
  getUserPostsClear ({ commit }) {
    commit('setUserPostsClear')
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
      post.isLiked = post.likes.map((like) => {
        return like.user_id
      }).includes(rootState.user.current.id)
    })
    commit('setFollowedPosts', postsArray)
  },
  // ---------- /posts/:id ----------
  getPost ({ rootState, commit }, postObj) {
    postObj.isLiked = postObj.likes.map((like) => {
      return like.user_id
    }).includes(rootState.user.current.id)
    commit('setPost', postObj)
  },
  // ---------- /users/:id/投稿 ----------
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
  // ---------- /users/:id/いいね ----------
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
  // 投稿
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
  async destroyPost ({ commit }, postIdRoute) {
    await this.$axios.delete(`/api/v1/posts/${postIdRoute.postId}`, {
      data: { id: postIdRoute.postId }
    })
      .then(() => {
        commit('reloadPostsByDestroyPost', postIdRoute.postId)
      })
      .then(() => {
        this.dispatch('getToast', {
          msg: '投稿を削除しました',
          color: 'prymary',
          timeout: 4000
        })
      })
      .then(() => {
        if (postIdRoute.route.includes('posts')) {
          this.app.router.push('/home')
        }
      })
  },
  // ==================================================
  // いいね
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
  // コメント
  // ==================================================
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
