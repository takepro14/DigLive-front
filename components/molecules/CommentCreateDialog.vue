<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template #activator="{ on, attrs }">
        <v-card
          color="button"
          dark
          v-bind="attrs"
          class="mx-auto text-center"
          hover
          rounded
          v-on="on"
        >
          <v-card-text>
            コメントする
          </v-card-text>
        </v-card>
      </template>

      <v-card>
        <v-card-title class="headline header text-subtitle-1 white--text">
          投稿にコメントする
        </v-card-title>
        <div class="ma-4">
          <v-form
            ref="form"
            v-model="isValid"
          >
            <v-textarea
              v-model="comment"
              :rules="rules"
              :counter="maxLengthComment"
              name="input-7-4"
              label="コメントフォーム"
              placeholder="素晴らしいパフォーマンス！"
              outlined
            />
          </v-form>
        </div>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="createComment"
            color="button white--text"
            width="100%"
            :disabled="!isValid"
          >
            コメントする
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
    const maxLengthComment = 300
    return {
      isValid: false,
      maxLengthComment,
      dialog: false,
      comment: 'テストコメント投稿',
      tags: [],
      rules: [
        v => !!v || '',
        v => (!!v && maxLengthComment >= v.length) || `${maxLengthComment}文字以内で入力してください`
      ],
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
