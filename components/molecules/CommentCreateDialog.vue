<template>
  <div
    class="text-center"
  >
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <!-- ダイアログクローズ -->
      <template
        #activator="{ on, attrs }"
      >
        <v-card
          color="purple lighten-4"
          v-bind="attrs"
          class="mx-auto text-center"
          hover
          rounded
          v-on="on"
          width="100%"
        >
          <v-card-text>
            <v-icon>
              mdi-comment-multiple-outline
            </v-icon>
            コメントする
          </v-card-text>
        </v-card>
      </template>
      <!-- ダイアログオープン -->
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
            label="コメントフォーム"
            placeholder="素晴らしいパフォーマンス！"
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
  props: {
    post: {
      type: Object
    }
  },
  data ({ $store }) {
    return {
      dialog: false,
      comment: 'テストコメント投稿',
      tags: [],
      rules: [v => v.length <= 300 || '300文字以内で入力してください'],
      user_id: $store.state.user.current.id
    }
  },
  methods: {
    createComment () {
      this.$emit('createCommentEvent', {
        userId: this.user_id,
        postId: this.post.id,
        comment: this.comment
      })
      this.dialog = false
    }
  }
}
</script>
