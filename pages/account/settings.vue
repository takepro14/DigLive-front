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
        <v-card v-if="menu === 'profileTab'">
          <v-container>
            <v-row>
              <v-col>
                <v-form
                  ref="form"
                  v-model="isValid"
                >
                  <InputFormName
                    :name.sync="params.user.name"
                  />
                  <InputFormProfile
                    :profile.sync="params.user.profile"
                  />
                  <v-file-input
                    label="プロフィール画像を選択"
                    accept="image/*"
                    prepend-icon="mdi-camera"
                    v-model="avatar"
                  />
                  <v-card-text>
                    好きな音楽ジャンル(複数選択可)
                    <InputFormGenre
                      :genres="genres"
                      :checkedGenres="params.user.checkedGenres"
                      @checkedGenresEvent="checkedGenres = $event"
                    />
                      :genres.sync="checkedGenres"
                  </v-card-text>
                  <v-btn
                    :disabled="!isValid || loading"
                    :loading="loading"
                    block
                    dark
                    color="button"
                    @click="changeProfile"
                  >
                    設定を保存する
                  </v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <!--------------------------------------------------
        -- アカウント設定
        -------------------------------------------------->
        <v-card v-else-if="menu === 'accountTab'">
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
          avatar: '',
          profile: '',
          password: '',
          activated: true,
          checkedGenres: []
        }
      },
      dialog: false
    }
  },
  methods: {
    tabClick (tabName) {
      this.menu = tabName
    },
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
  },
  async asyncData ({ $axios, store }) {
    const userObj = await $axios.$get(`/api/v1/users/${store.state.user.current.id}`)
    const genreObjs = await $axios.$get('/api/v1/genres')
    // console.log('userObj.name: ' + userObj.name)
    // console.log('userObj.email: ' + userObj.email)
    // console.log('userObj.avatar.url: ' + userObj.avatar.url)
    // console.log('userObj.profile: ' + userObj.profile)
    return {
      params: {
        user: {
          name: userObj.name,
          email: userObj.email,
          avatar: userObj.avatar.url,
          profile: userObj.profile,
          checkedGenres: userObj.genres.map((g) => { return g.genre_name })
        }
      },
      genres: genreObjs
    }
  }
}
</script>
