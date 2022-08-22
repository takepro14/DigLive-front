export const state = {
  posts: [],
  post: {},
  filterQuery: {
    content: ''
  }
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
    if (state.filterQuery.content !== '') {
      return posts.filter(post => post.content.includes(state.filterQuery.content))
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
  setFilterQuery (state, payload) {
    state.filterQuery.content = payload
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
  emitFilterQuery ({ commit }, params) {
    commit('setFilterQuery', params)
  }
}
