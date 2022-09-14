<template>
  <div class="text-center">
    <Toaster />
    <v-card
      width="100%"
    >
      <v-card-title
        class="headline grey lighten-2"
      >
        プロフィールを編集する
      </v-card-title>
      <v-container
        class="pa-2"
      >
        <v-row>
          <v-col>
            <!--------------------------------------------------
            -- タブ
            -------------------------------------------------->
            <template v-slot:extension>
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
            <!--------------------------------------------------
            -- プロフィール設定
            -------------------------------------------------->
            <div
              v-if="tab.name === 'profileTab'"
            >
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
                  v-model="params.user.avatar"
                />
                <v-card-text>
                  好きな音楽ジャンル(複数選択可)
                  <InputFormGenre
                    :genres="genres"
                    :checkedGenres="checkedGenres"
                    @checkedGenresEvent="params.user.checkedGenres = $event"
                  />
                    <!-- :genres.sync="params.user.checkedGenres" -->
                </v-card-text>
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
              </v-form>
            </div>
            <!--------------------------------------------------
            -- アカウント設定
            -------------------------------------------------->
            <div
              v-if="tab.name === 'accountTab'"
            >
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
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
      menu: 'profileTab',
      tabs: [
        {
          title: 'プロフィール',
          name: 'profileTab'
        },
        {
          title: 'アカウント',
          name: 'accountTab '
        }
      ],
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
          // ['ロック', 'J-POP', ...]
          checkedGenres: this.currentUser.genres.map((g) => { return g.genre_name })
        }
      },
      dialog: false
    }
  },
  computed: {
    ...mapGetters({
      genres: 'modules/genre/genres',
      currentUser: 'modules/user/currentUser'
    })
  },
  methods: {
    ...mapActions({
      getGenres: 'modules/genre/getGenres',
      getCurrentUser: 'modules/user/getCurrentUser'
    }),
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
  async fetch ({ $axios, store }) {
    await $axios.$get(`/api/v1/users/${store.state.user.current.id}`)
      .then((userObj) => {
        console.log('userObj: ' + JSON.stringify(this.params))
        store.commit('setCurrentUser', userObj)
      })
  }

  // async fetch () {
  //   await this.getCurrentUser()
  //     .then(() => {
  //       this.getGenres()
  //     })
  // }
}
</script>
