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
  },
  // 一時的な妥協案
  setPostForPosts (state, payload) {
    state.posts.unshift(payload)
  },
  setPostClear (state) {
    state.post = {}
  },
  reloadPostByLikePost (state, payload) {
    // 投稿一覧からいいねした場合
    if (Object.keys(state.post).length === 0) {
      const targetPost = state.posts.filter(post =>
        post.id === payload.reqPost.id
      )
      targetPost[0].isLiked = true
      targetPost[0].likes.push(payload.resLike)
    // 投稿詳細からいいねした場合
    } else {
      state.post.isLiked = true
      state.post.likes.push(payload.resLike)
    }
  },
  reloadPostByUnLikePost (state, payload) {
    // 投稿一覧からいいね解除した場合
    if (Object.keys(state.post).length === 0) {
      const targetPost = state.posts.filter(post =>
        post.id === payload.reqPost.id
      )
      targetPost[0].isLiked = false
      // console.log('targetPost[0]: ' + JSON.stringify(targetPost[0].likes))
      const otherUsersLikes = targetPost[0].likes.filter(like =>
        like.user_id !== payload.resLike.user_id
      )
      targetPost[0].likes = otherUsersLikes
    // 投稿詳細からいいね解除した場合
    } else {
      state.post.isLiked = false
      const otherUsersLikes = state.post.likes.filter(like =>
        like.user_id !== payload.resLike.user_id
      )
      state.post.likes = otherUsersLikes
    }
  },
  reloadComment (state, payload) {
    console.log('mutation reloadComment: ' + JSON.stringify(payload))
    state.post.comments.push(payload)
  }
  // reloadPostByComment (state, payload) {
  //   state.post.comments.push(payload)
  // }
}

export const actions = {
  async getPosts ({ state, commit, rootState, dispatch }) {
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
  emitSetPost ({ rootState, commit }, post) {
    // postへの追加処理: いいね済の場合にtrueを立てる
    // let likedUserIds = []
    const likedUserIds = post.likes.map((like) => {
      return like.user_id
    })
    post.isLiked = likedUserIds.includes(rootState.user.current.id)
    commit('setPost', post)
  },
  // async getPost ({ commit, rootState }, postId) {
  //   await this.$axios.$get(`/api/v1/posts/${postId}`)
  //     // postへの追加処理: いいね済の場合にtrueを立てる
  //     .then((post) => {
  //       let likedUserIds = []
  //       likedUserIds = post.likes.map((like) => {
  //         return like.user_id
  //       })
  //       post.isLiked = likedUserIds.includes(rootState.user.current.id)
  //       return post
  //     })
  //     .then((post) => {
  //       commit('setPost', post)
  //     })
  // },
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
  emitSetFilterQueryKeyword ({ commit }, param) {
    commit('setFilterQueryKeyword', param)
  },
  async likePost ({ rootState, commit }, post) {
    await this.$axios.$post('/api/v1/likes', {
      like: {
        user_id: rootState.user.current.id,
        post_id: post.id
      }
    })
      .then((like) => {
        commit('reloadPostByLikePost', {
          resLike: like,
          reqPost: post
        })
      })
  },
  async unLikePost ({ rootState, commit }, post) {
    // user_id, post_idが同じレコードは1つしか存在しないので[0]
    const likeId = post.likes.filter((like) => {
      return like.user_id === rootState.user.current.id && like.post_id === post.id
    })[0].id
    await this.$axios.$delete(`/api/v1/likes/${likeId}`, {
      params: { id: likeId }
    })
      .then((like) => {
        commit('reloadPostByUnLikePost', {
          resLike: like,
          reqPost: post
        })
      })
  },
  reloadComment ({ commit }, payload) {
    console.log('actions reloadComment: ' + JSON.stringify(payload))
    commit('reloadComment', payload)
  }
  // emitReloadPostByComment ({ commit }, commentObj) {
  //   commit('reloadPostByComment', commentObj)
  // }
}
