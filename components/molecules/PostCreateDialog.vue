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
          color="button"
          v-bind="attrs"
          style="bottom:65px;right:65px"
          v-on="on"
          x-large
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <!-- ダイアログオープン -->
      <v-card>
        <v-card-title
          class="headline subheader"
        >
          ライブ映像をシェアする
        </v-card-title>
        <div
          class="ma-4"
        >
          <v-text-field
            v-model="youtube_url"
            label="YouTube URL"
            placeholder="該当動画のURLをペーストしてください"
            outlined
          />
          <v-textarea
            v-model="content"
            :rules="rules"
            counter="300"
            name="input-7-4"
            label="コメント"
            placeholder="Cメロのギターソロが最高！"
            outlined
          />
          <InputFormGenre
            :genres="genres"
            @checkedGenresEvent="checkedGenres = $event"
          />
          <InputFormTag
            :init-tags="tags"
            @changed-tags="tags = $event"
          />
        </div>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="button"
            dark
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
export default {
  props: {
    genres: {
      type: Array
    }
  },
  data ({ $store }) {
    return {
      dialog: false,
      youtube_url: '',
      content: 'テスト',
      tags: [],
      rules: [v => v.length <= 300 || '300文字以内で入力してください'],
      user_id: $store.state.user.current.id,
      checkedGenres: []
    }
  },
  methods: {
    createPost () {
      this.$emit('createPostEvent', {
        tags: this.tags,
        userId: this.user_id,
        youtubeUrl: this.youtube_url,
        content: this.content,
        genres: this.checkedGenres
      })
      this.content = ''
      this.dialog = false
      this.$vuetify.goTo(0)
      this.checkedGenres = []
    }
  }
}
</script>
