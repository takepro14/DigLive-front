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
            outlined
            name="input-7-4"
            label="入力フォーム"
            v-model="content"
            placeholder="僕はこんなことをして垢抜けました。・・・"
            :rules="rules"
            counter="100"
          >
          </v-textarea>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn
              @click="postMessage"
            >
              投稿する
            </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-card-actions>
          <v-spacer></v-spacer>
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
      dialog: false,
      content: '',
      rules: [v => v.length <= 100 || '100文字以内で入力してください']
    }
  },
  methods: {
    postMessage () {
      const url = '/api/v1/posts'
      const post = {
        user_id: 1, // 後から動的にする
        content: this.content
      }
      this.$axios.post(url, { post })
        .then(res => console.log(res.status))
        .catch(error => console.log(error))
      this.content = ''
      this.dialog = false
    }
  }
}
//   async postData ({ $axios }) {
//     // 投稿のロジックを書く
//     const params = {
//       user_id: 1, // 後から動的にする
//       content: this.content
//     }
//     await $axios.$post(
//       '/api/v1/posts', params
//     )
//       .then((res) => {
//         alert(res)
//       })
//   }
</script>
