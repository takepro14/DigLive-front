export const state = {
  tags: [],
  checkedTag: ''
}

export const getters = {
  tags (state) {
    return state.tags
  }
}

export const mutations = {
  setTags (state, payload) {
    state.tags = payload
  },
  setTagTrue (state, payload) {
    state.checkedTag = payload
  },
  setTagFalse (state) {
    state.checkedTag = ''
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
  },
  emitSetTagTrue ({ commit }, param) {
    commit('setTagTrue', param)
  },
  emitSetTagFalse ({ commit }) {
    commit('setTagFalse')
  }
}
