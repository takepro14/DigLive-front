<template>
  <div class="text-center">
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
          投稿を削除する
        </v-card-title>
        <v-row
          class="text-center pt-6 pb-2"
        >
          <v-card-text>
            以下の投稿を削除しますか？
          </v-card-text>
        </v-row>
        <v-row
          class="text-center pb-2"
        >
          <v-card-text
            class="font-weight-bold"
          >
            "{{ post.content }}"
          </v-card-text>
        </v-row>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="button white--text"
            width="100%"
            @click="destroyPost(post.id)"
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
  props: {
    post: {
      type: Object
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    destroyPost (postId) {
      this.$emit('destroyPostEvent', postId)
      this.dialog = false
    }
  }
}
</script>
