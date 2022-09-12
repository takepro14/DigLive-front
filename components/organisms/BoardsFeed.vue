
<template>
  <div
    class="mx-auto"
  >
    <v-card
      width="100%"
    >
      <v-list
        three-line
      >
        <template>
          <v-subheader>
            最終更新順
          </v-subheader>
          <div
            v-for="board in boards"
            :key="board.id"
          >
            <Board
              :board="board"
            />
          </div>
        </template>
      </v-list>
    </v-card>
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
      boards: 'modules/board/boards'
    })
  },
  methods: {
    ...mapActions({
      getBoards: 'modules/board/getBoards'
    })
  },
  async fetch () {
    await this.getBoards()
  }
}
</script>
