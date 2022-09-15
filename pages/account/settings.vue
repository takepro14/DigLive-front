<template>
  <v-container
    class="pa-2 text-center"
  >
    <Toaster />
    <v-row>
      <v-col>
        <!--------------------------------------------------
        -- タブ
        -------------------------------------------------->
        <v-toolbar
          color="subheader"
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
              slider-color="yellow"
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
                  <v-card-text
                    class="font-weight-bold"
                  >
                    好きな音楽ジャンル(複数選択可)
                  </v-card-text>
                  <v-card-text
                    v-if="params.user.checkedGenres.length"
                  >
                    {{ params.user.checkedGenres.join('・') }}
                  </v-card-text>
                  <v-card-text
                    v-else-if="!params.user.checkedGenres.length"
                  >
                    なし
                  </v-card-text>
                  <v-card-text>
                    <InputFormGenre
                      :genres="genres"
                      :checkedGenres="params.user.checkedGenres"
                      @formGenreCheckedEvent="formGenreChecked"
                      @formGenreUncheckedEvent="formGenreUnchecked"
                    />
                  </v-card-text>
                  <v-btn
                    :disabled="!isValid || loading"
                    :loading="loading"
                    block
                    dark
                    color="button"
                    @click="changeProfileData"
                  >
                    設定を変更する
                  </v-btn>
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
