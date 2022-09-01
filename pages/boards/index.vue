<template>
  <v-container>
    <v-row>
      <v-col>
        <Board
          :boards="boards"
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
