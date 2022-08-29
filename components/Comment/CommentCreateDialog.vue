<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template
        #activator="{ on, attrs }"
      >
        <v-card
          color="blue lighten-4"
          v-bind="attrs"
          style="max-width: 600px"
          class="mx-auto text-center"
          v-on="on"
        >
          <v-card-text>
            コメントする
          </v-card-text>
        </v-card>
      </template>
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
        >
          投稿にコメントする
        </v-card-title>
        <div
          class="ma-4"
        >
          <v-textarea
            v-model="comment"
            :rules="rules"
            counter="300"
            name="input-7-4"
            label="入力フォーム"
            placeholder="僕はこんなことをして垢抜けました。・・・"
            outlined
          />
        </div>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="createComment"
          >
            投稿する
          </v-btn>
          <v-spacer />
        </v-card-actions>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data ({ $store }) {
    return {
      dialog: false,
      comment: 'テストコメント投稿',
      tags: [],
      rules: [v => v.length <= 300 || '300文字以内で入力してください'],
      user_id: $store.state.user.current.id
    }
  },
  props: {
    post: {
      type: Object
    }
  },
  methods: {
    createComment () {
      const url = '/api/v1/comments'
      const data = new FormData()
      data.append('comment[user_id]', this.user_id)
      data.append('comment[post_id]', this.post.id)
      data.append('comment[comment]', this.comment)
      this.$axios.post(url, data)
        .then((comment) => {
          this.$emit('reloadComments', comment)
          this.dialog = false
        })
    }
  }
}
</script>
