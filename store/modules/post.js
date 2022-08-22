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
  setPostClear (state) {
    state.post = {}
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
  }
}
