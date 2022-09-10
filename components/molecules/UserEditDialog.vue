<template>
  <div class="text-center">
    <Toaster />
    <v-dialog
      v-model="dialog"
      width="50%"
    >
      <!-- ダイアログクローズ -->
      <template
        #activator="{ on, attrs }"
      >
        <v-btn
          v-bind="attrs"
          outlined
          rounded
          text
          v-on="on"
          color="grey"
        >
          <v-icon>
            mdi-cog
          </v-icon>
          Settings
        </v-btn>
      </template>
      <!-- ダイアログオープン -->
      <v-card
        width="100%"
      >
        <v-card-title
          class="headline grey lighten-2"
        >
          プロフィールを編集する
        </v-card-title>
        <v-container
          class="pa-16"
        >
          <v-row>
            <v-col>
              <v-form
                ref="form"
                v-model="isValid"
              >
                <InputFormName
                  :name.sync="params.user.name"
                />
                <InputFormEmail
                  :email.sync="params.user.email"
                />
                <InputFormProfile
                  :profile.sync="params.user.profile"
                />
                <!-- <InputFormPassword
                  :password.sync="params.user.password"
                /> -->
                <v-file-input
                  label="プロフィール画像を選択"
                  accept="image/*"
                  prepend-icon="mdi-camera"
                  v-model="params.user.avatar"
                />
                <v-card-text>
                  好きな音楽ジャンル(複数選択可)
                  <InputFormGenre
                    :genres="genres"
                    @checkedGenresEvent="params.user.checkedGenres = $event"
                  />
                </v-card-text>
              </v-form>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  :disabled="!isValid || loading"
                  :loading="loading"
                  block
                  class="white--text"
                  color="blue lighten-2"
                  @click="changeProfile"
                >
                  設定を保存する
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
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object
    },
    currentUser: {
      type: Object
    },
    genres: {
      type: Array
    }
  },
  data () {
    return {
      isValid: false,
      loading: false,
      params: {
        user: {
          name: this.currentUser.name,
          email: this.currentUser.email,
          avatar: this.currentUser.avatar.url,
          profile: this.currentUser.profile,
          // password: '',
          activated: true,
          checkedGenres: []
        }
      },
      dialog: false
    }
  },
  methods: {
    changeProfile () {
      const formData = new FormData()
      formData.append('user[name]', this.params.user.name)
      formData.append('user[email]', this.params.user.email)
      formData.append('user[profile]', this.params.user.profile)
      formData.append('user[avatar]', this.params.user.avatar)
      if (this.params.user.checkedGenres.length !== 0) {
        this.params.user.checkedGenres.forEach((genre) => {
          formData.append('user[genres][]', genre)
        })
      }
      const config = {
        headders: {
          'content-type': 'multipart/form-data'
        }
      }
      this.$emit('changeProfileEvent', { formData, config })
      this.dialog = false
    }
  }
}
</script>
