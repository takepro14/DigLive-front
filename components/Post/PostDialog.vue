<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          fixed
          fab
          bottom
          right
          dark
          color="indigo"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
        >
          つぶやきを投稿する
        </v-card-title>
        <div
          class="ma-4"
        >
          <v-textarea
            v-model="content"
            :rules="rules"
            counter="300"
            name="input-7-4"
            label="入力フォーム"
            placeholder="僕はこんなことをして垢抜けました。・・・"
            outlined
          />
          <post-dialog-tag-form
            @changed-tags="tags = $event"
          />
        </div>
        <v-card-actions>
          <v-spacer />
            <v-btn
              @click="postMessage"
            >
              投稿する
            </v-btn>
              親tags：{{ tags }}
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
      content: '',
      tags: [],
      rules: [v => v.length <= 300 || '300文字以内で入力してください'],
      user_id: $store.state.user.current.id
    }
  },
  methods: {
    postMessage () {
      const url = '/api/v1/posts'
      const post = {
        user_id: this.user_id,
        content: this.content,
        tag_name: this.tag_name
      }
      this.$axios.post(url, { post })
        .then(res => console.log(res.status))
        .catch(error => console.log(error))
      this.content = ''
      this.dialog = false
    }
  }
}
</script>
