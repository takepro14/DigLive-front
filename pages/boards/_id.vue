<template>
  <v-container>
    <v-icon
      x-large
      @click="historyBack"
    >
      mdi-keyboard-backspace
    </v-icon>
    <v-row>
      <v-col>
      <Board
        :board="board"
      />
      </v-col>
    </v-row>
  </v-container>
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
    }),
    historyBack () {
      this.$router.go(-1)
    }
  },
  async fetch ({ $axios, params, store }) {
    await $axios.$get(`/api/v1/boards/${params.id}`)
      .then((board) => {
        store.dispatch('modules/board/emitSetBoard', board)
      })
  }
}
</script>
