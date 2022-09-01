<template>
  <v-list-item
    @click="moveBoardPage"
  >
    <v-list-item-avatar>
      <v-img
        :src="avatarUrl"
      />
    </v-list-item-avatar>
    <v-container>
      <v-row>
        <v-col
          cols="8"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ board.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ board.description }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-col>
        <v-col
          cols="4"
        >
          <span>
            {{ $my.format(board.updated_at) }}
          </span>
        </v-col>
      </v-row>
    <v-divider />
    </v-container>
  </v-list-item>
</template>

<script>
export default {
  props: {
    board: {
      type: Object
    }
  },
  data () {
    return {
      avatarUrl: 'http://localhost:3000' + this.board.user.avatar.url
    }
  },
  methods: {
    moveBoardPage () {
      this.$router.push(`/boards/${this.board.id}`)
    }
  }
}
</script>
