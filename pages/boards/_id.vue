<template>
  <div>
    <Board
      :board="board"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'logged-in',
  middleware: [
    'authentication'
  ],
  computed: {
    ...mapGetters({
      board: 'modules/board/board'
    })
  },
  methods: {
    ...mapActions({
      getBoard: 'modules/board/getBoard'
    })
  },
  async fetch ({ $axios, params, store }) {
    await $axios.$get(`/api/v1/boards/${params.id}`)
      .then((board) => {
        store.dispatch('modules/board/emitSetBoard', board)
      })
  }
}
</script>
