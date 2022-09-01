export const state = {
  boards: [],
  board: {}
}

export const getters = {
  boards (state) {
    return state.boards
  },
  board (state) {
    return state.board
  }
}

export const mutations = {
  setBoards (state, payload) {
    state.boards = payload
  },
  setBoard (state, payload) {
    state.board = payload
  },
}

export const actions = {
  async getBoards ({ state, commit }) {
    if (!state.boards.length) {
      await this.$axios.$get('/api/v1/boards')
        .then((boards) => {
          commit('setBoards', boards)
        })
    }
  }
}
