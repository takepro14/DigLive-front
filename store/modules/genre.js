export const state = {
  genres: [],
  checkedGenre: ''
}

export const getters = {
  genres (state) {
    return state.genres
  }
}

export const mutations = {
  setGenres (state, payload) {
    state.genres = payload
  }
}

export const actions = {
  async getGenres ({ state, commit }) {
    if (!state.genres.length) {
      await this.$axios.$get('/api/v1/genres')
        .then((genres) => {
          commit('setGenres', genres)
        })
    }
  }
}
