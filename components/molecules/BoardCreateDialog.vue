<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <!-- ダイアログクローズ -->
      <template
        #activator="{ on, attrs }"
      >
        <v-btn
          fixed
          fab
          bottom
          right
          dark
          color="indigo"
          v-bind="attrs"
          style="bottom: 65px"
          v-on="on"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <!-- ダイアログオープン -->
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
          <InputFormTag
            :init-tags="tags"
            @changed-tags="tags = $event"
          />
        </div>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="createPost"
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
import { mapActions } from 'vuex'
export default {
  data ({ $store }) {
    return {
      dialog: false,
      content: 'テスト投稿',
      tags: [],
      rules: [v => v.length <= 300 || '300文字以内で入力してください'],
      user_id: $store.state.user.current.id
    }
  },
  methods: {
    ...mapActions({
      getPostForPosts: 'modules/post/getPostForPosts'
    }),
    createPost () {
      const url = '/api/v1/posts'
      const postData = new FormData()
      if (this.tags.length !== 0) {
        this.tags.forEach((tag) => {
          postData.append('post[tags][]', tag.text)
        })
      }
      postData.append('post[user_id]', this.user_id)
      postData.append('post[content]', this.content)
      this.$axios.post(url, postData)
        .then((res) => {
          // console.log('data: ' + JSON.stringify(data))
          // console.log(res.data.id)
          this.getPostForPosts(res.data.id)
        })
      this.content = ''
      this.dialog = false
    }
  }
}
</script>
