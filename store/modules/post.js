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
  setLikePost (state, payload) {
    state.post.likes.push(payload)
  }
}

export const actions = {
  async getPosts ({ state, commit }) {
    // 一覧に戻った時、post(vuex)のオブジェクトをクリアする
    commit('setPostClear')
    if (!state.posts.length) {
      await this.$axios.$get('/api/v1/posts')
        .then((posts) => {
          commit('setPosts', posts)
        })
    }
  },
  async getPost ({ state, commit }, params) {
    if (!state.post.length) {
      await this.$axios.$get(`/api/v1/posts/${params}`)
        .then((post) => {
          commit('setPost', post)
        })
    }
  },
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
  async likePost ({ rootState, commit }, param) {
    // console.log(currentUserId)
    await this.$axios.$post('/api/v1/likes', {
      like: {
        user_id: rootState.user.current.id,
        post_id: param.id
      }
    })
      .then((res) => {
        commit('setLikePost', res)
      })
  }
}
