export const state = {
  tags: []
}

export const getters = {
  tags (state) {
    return state.tags
  }
}

export const mutations = {
  setTags (state, payload) {
    state.tags = payload
  }
}

export const actions = {
  async getTags ({ state, commit }) {
    if (!state.tags.length) {
      await this.$axios.$get('/api/v1/tags')
        .then((tags) => {
          commit('setTags', tags)
        })
    }
  }
}
