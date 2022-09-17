<template>
  <div
    class="text-center"
  >
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template
        #activator="{ on, attrs }"
      >
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon
            class="text-right"
          >
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="headline header white--text"
        >
          コメントを削除する
        </v-card-title>
        <v-row
          class="text-center pt-6 pb-2"
        >
          <v-card-text>
            以下のコメントを削除しますか？
          </v-card-text>
        </v-row>
        <v-row
          class="text-center pb-2"
        >
          <v-card-text
            class="font-weight-bold"
          >
            "{{ comment.comment }}"
          </v-card-text>
        </v-row>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="destroyComment(comment.id)"
            color="button white--text"
            width="100%"
          >
            削除する
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
  data () {
    return {
      dialog: false
    }
  },
  props: {
    comment: {
      type: Object
    }
  },
  methods: {
    destroyComment (commentId) {
      this.$emit('destroyCommentEvent', commentId)
      this.dialog = false
    }
  }
}
</script>
