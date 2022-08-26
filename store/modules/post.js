export const state = {
  posts: [],
  post: {},
  filterQueryKeyword: '',
  filterQueryTag: ''
}

export const getters = {
  posts (state) {
    return state.posts
  },
  post (state) {
    return state.post
  },
  filteredPosts (state) {
    const posts = state.posts
    // キーワードサーチ
    if (state.filterQueryKeyword) {
      return posts.filter(post => post.content.includes(state.filterQueryKeyword))
    // タグサーチ
    } else if (state.filterQueryTag) {
      return posts.filter(post => post.tags.map(tag => tag.tag_name).includes(state.filterQueryTag))
    } else {
      // 何も表示しない
    }
  }
}

export const mutations = {
  setPosts (state, payload) {
    state.posts = payload
  },
  setPost (state, payload) {
    state.post = payload
  },
  setPostClear (state) {
    state.post = {}
  },
  setFilterQueryKeyword (state, payload) {
    state.filterQueryKeyword = payload
  },
  setFilterQueryTag (state, payload) {
    state.filterQueryTag = payload
  },
  setFilterQueryKeywordBlank (state) {
    state.filterQueryKeyword = ''
  },
  setFilterQueryTagBlank (state) {
    state.filterQueryTag = ''
  },
  // 即時反映用処理
  reloadPostByLikePost (state, payload) {
    state.post.isLiked = true
    console.log(state.post.likes)
    state.post.likes.push(payload)
  },
  reloadPostByUnLikePost (state, payload) {
    state.post.isLiked = false
    const otherUsersLikes = state.post.likes.filter(like =>
      like.user_id !== payload.user_id && like.post_id !== payload.post_id
    )
    state.post.likes = otherUsersLikes
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
  async getPost ({ commit, rootState }, postId) {
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
        commit('setPost', post)
      })
  },
  // judgeIsLiked ({ rootState }, post) {
  //   // let isLiked = false
  //   let likedUserIds = []
  //   likedUserIds = post.likes.map((like) => {
  //     return like.user_id
  //   })
  //   return likedUserIds.includes(rootState.user.current.id)
  // },
  emitSetFilterQueryKeyword ({ commit }, param) {
    commit('setFilterQueryKeyword', param)
  },
  // tag.jsからチェックしたタグのリストを取得
  emitSetFilterQueryTag ({ rootState, commit }) {
    const checkedTag = rootState.modules.tag.checkedTag
    commit('setFilterQueryTag', checkedTag)
  },
  emitSetFilterQueryKeywordBlank ({ commit }) {
    commit('setFilterQueryKeywordBlank')
  },
  emitSetFilterQueryTagBlank ({ commit }) {
    commit('setFilterQueryTagBlank')
  },
  async likePost ({ rootState, commit }, post) {
    await this.$axios.$post('/api/v1/likes', {
      like: {
        user_id: rootState.user.current.id,
        post_id: post.id
      }
    })
      .then((like) => {
        commit('reloadPostByLikePost', like)
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
        commit('reloadPostByUnLikePost', like)
      })
  }
}
