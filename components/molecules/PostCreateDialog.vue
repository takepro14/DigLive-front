<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          fixed
          fab
          bottom
          right
          dark
          color="button"
          v-bind="attrs"
          style="bottom:70px;right:40px"
          v-on="on"
          x-large
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline header white--text">
          ライブ映像をシェアする
        </v-card-title>
        <!-- {{ checkedGenres }} -->
        <div class="ma-4">
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
          <v-card-text>
            音楽ジャンル (任意・複数可)
            <InputFormGenre
              :genres="genres"
              @formGenreCheckedEvent="formGenreChecked"
              @formGenreUncheckedEvent="formGenreUnchecked"
              ref="child"
            />
          </v-card-text>
          <v-card-text>
            タグ (任意・複数可)
            <InputFormTag
              :tags="tags"
              :init-tags="inputTags"
              @changed-tags="inputTags = $event"
            />
          </v-card-text>
        </div>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="button"
            dark
            width="100%"
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
    },
    tags: {
      type: Array
    }
  },
  data ({ $store }) {
    return {
      dialog: false,
      youtube_url: '',
      content: 'テスト',
      inputTags: [],
      rules: [v => v.length <= 300 || '300文字以内で入力してください'],
      user_id: $store.state.user.current.id,
      checkedGenres: []
    }
  },
  methods: {
    formGenreChecked (value) {
      this.checkedGenres.push(value)
    },
    formGenreUnchecked (value) {
      const idx = this.checkedGenres.indexOf(value)
      this.checkedGenres.splice(idx, 1)
    },
    createPost () {
      this.$emit('createPostEvent', {
        tags: this.inputTags,
        userId: this.user_id,
        youtubeUrl: this.youtube_url,
        content: this.content,
        genres: this.checkedGenres
      })
      this.dialog = false
      this.$vuetify.goTo(0)
      this.content = ''
      this.checkedGenres = []
    }
  }
}
</script>
