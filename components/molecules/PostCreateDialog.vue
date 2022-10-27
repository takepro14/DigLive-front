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
          color="button white--text"
          v-bind="attrs"
          style="bottom:70px;right:40px"
          v-on="on"
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline header white--text">
          ライブ映像をシェアする
        </v-card-title>
        <!-- {{ checkedGenres }} -->
        <v-form
          ref="form"
          v-model="isValid"
        >
          <div class="ma-4">
            <v-text-field
              v-model="youtube_url"
              :rules="rulesUrl"
              label="YouTube URL (必須)"
              placeholder="該当動画のURLをペースト"
              outlined
            />
            <v-textarea
              v-model="content"
              :rules="rulesContent"
              :counter="maxLengthContent"
              name="input-7-4"
              label="コメント (必須)"
              placeholder="おすすめしたいポイントは？"
              outlined
            />
            <v-card-text>
              音楽ジャンル
              <InputFormGenre
                :genres="genres"
                @formGenreCheckedEvent="formGenreChecked"
                @formGenreUncheckedEvent="formGenreUnchecked"
                ref="child"
              />
            </v-card-text>
            <v-card-text>
              タグ
              <InputFormTag
                :tags="tags"
                :init-tags="inputTags"
                @changed-tags="inputTags = $event"
              />
            </v-card-text>
          </div>
        </v-form>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="button white--text"
            width="100%"
            :disabled="!isValid"
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
    const maxLengthContent = 300
    const allowDomain = ['https://www.youtube.com', 'https://youtu.be']
    return {
      maxLengthContent,
      allowDomain,
      isValid: false,
      dialog: false,
      youtube_url: '',
      content: '',
      inputTags: [],
      rulesUrl: [
        v => !!v || '',
        v => (!!v && allowDomain.some(url => v.includes(url))) || 'URLが正しくありません'
      ],
      rulesContent: [
        v => !!v || '',
        v => (!!v && maxLengthContent >= v.length) || `${maxLengthContent}文字以内で入力してください`
      ],
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
      this.clearForm()
    },
    clearForm () {
      this.youtube_url = ''
      this.content = ''
      this.checkedGenres.splice(0)
      this.inputTags.splice(0)
      this.$refs.form.reset()
      this.$refs.child.forceUpdate()
    }
  }
}
</script>
