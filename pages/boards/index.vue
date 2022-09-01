<template>
  <v-container>
    <v-row>
      <v-col>
          <v-card
            width="1000"
            min-width="500"
            class="mx-auto"
          >
            <v-toolbar
              color="cyan"
              dark
            >
              <v-toolbar-title>
                掲示板一覧
              </v-toolbar-title>
            </v-toolbar>
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
