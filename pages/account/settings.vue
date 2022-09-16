<template>
  <v-container
    class="pa-2"
  >
    <Toaster />
    <v-row>
      <v-col>
        <!--------------------------------------------------
        -- タブ
        -------------------------------------------------->
        <v-toolbar
          color="header"
          dark
          flat
        >
          <v-toolbar-title
            class="mx-auto"
          >
            設定
          </v-toolbar-title>
          <template
            #extension
          >
            <v-tabs
              centered
              slider-color="slider"
              grow
            >
              <v-tab
                v-for="tab in tabs"
                :key="tab.id"
                @click="tabClick(tab.name)"
              >
                {{ tab.title }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <!--------------------------------------------------
        -- プロフィール設定
        -------------------------------------------------->
        <v-card
          v-if="menu === 'profileTab'"
        >
          <v-container>
            <v-row>
              <v-col>
                <v-form
                  ref="form"
                  v-model="isValid"
                >
                  <v-col
                    class="text-center"
                  >
                    <v-list-item-title
                      class="font-weight-bold"
                    >
                      プロフィール画像
                    </v-list-item-title>
                    <v-avatar
                      size="200"
                      tile
                    >
                      <v-img
                        :src="'http://localhost:3000' + params.user.avatar"
                        contain
                      />
                    </v-avatar>
                  </v-col>
                  <InputFormName
                    :name.sync="params.user.name"
                  />
                  <InputFormProfile
                    :profile.sync="params.user.profile"
                  />
                  <v-file-input
                    label="プロフィール画像を選択"
                    v-model="params.user.avatar"
                    accept="image/*"
                    prepend-icon="mdi-camera"
                  />
                  <v-card-text>
                    好きな音楽ジャンル(複数選択可)
                  </v-card-text>
                  <v-card-text class="text-center">
                    {{ dispCheckedGenres }}
                  </v-card-text>
                  <v-card-text>
                    <InputFormGenre
                      :genres="genres"
                      :checkedGenres="params.user.checkedGenres"
                      @formGenreCheckedEvent="formGenreChecked"
                      @formGenreUncheckedEvent="formGenreUnchecked"
                    />
                  </v-card-text>
                  <!--------------------------------------------------
                  -- プロフィール変更ダイアログ
                  -------------------------------------------------->
                  <v-dialog
                    v-model="dialog"
                    width="500"
                  >
                    <!-- ダイアログクローズ -->
                    <template
                      #activator="{ on, attrs }"
                    >
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        :disabled="!isValid || loading"
                        :loading="loading"
                        block
                        dark
                        color="button"
                      >
                        設定を変更する
                      </v-btn>
                    </template>
                    <!-- ダイアログオープン -->
                    <v-card>
                      <v-card-title
                        class="headline header white--text"
                      >
                        プロフィールを変更する
                      </v-card-title>
                      <div
                        class="ma-4"
                      >
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title
                              class="py-4"
                            >
                              以下の内容で変更します。
                            </v-list-item-title>
                            <v-list-item-title
                              class="pt-6"
                            >
                              ユーザー名
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              {{ params.user.name }}
                            </v-list-item-subtitle>
                            <v-list-item-title
                              class="pt-6"
                            >
                              プロフィール
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              {{ params.user.profile }}
                            </v-list-item-subtitle>
                            <v-list-item-title
                              class="pt-6"
                            >
                              プロフィール画像
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              {{ params.user.avatar }}
                            </v-list-item-subtitle>
                            <v-list-item-title
                              class="pt-6"
                            >
                              好きな音楽ジャンル
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              {{ params.user.checkedGenres.join('・') }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </div>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="button"
                          dark
                          @click="changeProfileData"
                          width="100%"
                        >
                          変更を確定する
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
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <!--------------------------------------------------
        -- アカウント設定
        -------------------------------------------------->
        <v-card
          v-else-if="menu === 'accountTab'"
        >
          <v-container>
            <v-row>
              <v-col>
                <v-form
                  ref="form"
                  v-model="isValid"
                >
                  <InputFormEmail
                    :email.sync="params.user.email"
                  />
                  <InputFormPassword
                    :password.sync="params.user.password"
                  />
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      menu: 'profileTab',
      tabs: [
        {
          title: 'プロフィール',
          name: 'profileTab'
        },
        {
          title: 'アカウント',
          name: 'accountTab'
        }
      ],
      isValid: false,
      loading: false,
      params: {
        user: {
          name: '',
          email: '',
          profile: '',
          avatar: '',
          password: '',
          activated: true,
          checkedGenres: []
        }
      },
      dialog: false,
      isChanging: false
    }
  },
  computed: {
    dispCheckedGenres () {
      if (this.params.user.checkedGenres.length) {
        return this.params.user.checkedGenres.join('・')
      } else {
        return 'なし'
      }
    }
  },
  methods: {
    ...mapActions({
      changeProfile: 'modules/user/changeProfile'
    }),
    tabClick (tabName) {
      this.menu = tabName
    },
    formGenreChecked (value) {
      if (!this.isChanging) {
        this.isChanging = true
        this.params.user.checkedGenres = []
        this.params.user.checkedGenres.push(value)
      } else if (this.isChanging) {
        this.params.user.checkedGenres.push(value)
      }
    },
    formGenreUnchecked (value) {
      const index = this.params.user.checkedGenres.indexOf(value)
      this.params.user.checkedGenres.splice(index, 1)
    },
    changeProfileData () {
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
      this.changeProfile({ formData, config })
      this.dialog = false
      this.isChanging = false
    }
  },
  async asyncData ({ $axios, store }) {
    const userObj = await $axios.$get(`/api/v1/users/${store.state.user.current.id}`)
    const genreObjs = await $axios.$get('/api/v1/genres')
    return {
      params: {
        user: {
          name: userObj.name,
          email: userObj.email,
          profile: userObj.profile,
          checkedGenres: userObj.genres.map((g) => { return g.genre_name }),
          avatar: userObj.avatar.url
        }
      },
      genres: genreObjs
    }
  }
}
</script>
