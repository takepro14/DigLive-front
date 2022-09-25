<template>
  <v-container class="pa-2">
    <Toaster />
    <HistoryBack class="py-4" />
    <v-row>
      <v-col>
        <v-toolbar
          color="header"
          dark
          flat
        >
          <v-toolbar-title class="mx-auto">
            設定
          </v-toolbar-title>
          <template #extension>
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
        <v-card v-if="menu === 'profileTab'">
          <v-container>
            <v-row>
              <v-col>
                <v-form ref="form">
                  <v-col class="text-center">
                    <v-list-item-title class="font-weight-bold">
                      プロフィール画像
                    </v-list-item-title>
                    <v-avatar
                      size="200"
                      tile
                    >
                      <v-img
                        :src="userAvatar"
                        contain
                      />
                    </v-avatar>
                  </v-col>
                  <InputFormName :name.sync="params.user.name" />
                  <InputFormProfile :profile.sync="params.user.profile" />
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
                    <div>【選択中】</div>
                    {{ displayCheckedGenres }}
                  </v-card-text>
                  <v-card-text>
                    <InputFormGenre
                      :genres="genres"
                      :checkedGenres="params.user.checkedGenres"
                      @formGenreCheckedEvent="formGenreChecked"
                      @formGenreUncheckedEvent="formGenreUnchecked"
                    />
                  </v-card-text>
                  <v-dialog
                    v-model="dialog"
                    width="500"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        block
                        dark
                        color="button"
                        @click="changeTarget"
                      >
                        設定を変更する
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline header white--text">
                        プロフィールを変更する
                      </v-card-title>
                      <div class="ma-4">
                        <v-list-item>
                          <!-- 変更なし -->
                          <v-list-item-content v-if="!changeTargetLists.length">
                            <v-list-item-title class="py-4">
                              変更する項目はありません
                            </v-list-item-title>
                          </v-list-item-content>
                          <!-- /変更なし -->
                          <!-- 変更あり -->
                          <v-list-item-content v-else>
                            <v-list-item-title class="py-4">
                              以下の内容を変更します
                            </v-list-item-title>
                            <div v-if="changeTargetLists.includes('name')">
                              <v-list-item-title class="pt-6">
                                ユーザー名
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                {{ params.user.name }}
                              </v-list-item-subtitle>
                            </div>
                            <div v-if="changeTargetLists.includes('profile')">
                              <v-list-item-title class="pt-6">
                                プロフィール
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                {{ params.user.profile }}
                              </v-list-item-subtitle>
                            </div>
                            <div v-if="changeTargetLists.includes('avatar')">
                              <v-list-item-title class="pt-6">
                                プロフィール画像
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                {{ params.user.avatar }}
                              </v-list-item-subtitle>
                            </div>
                            <div v-if="changeTargetLists.includes('checkedGenres')">
                              <v-list-item-title class="pt-6">
                                好きな音楽ジャンル
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                {{ displayCheckedGenres }}
                              </v-list-item-subtitle>
                            </div>
                            <v-card-actions>
                              <v-spacer />
                              <v-btn
                                color="button"
                                dark
                                @click="submitChangedData"
                                width="100%"
                              >
                                変更を確定する
                              </v-btn>
                              <v-spacer />
                            </v-card-actions>
                          </v-list-item-content>
                          <!-- /変更あり -->
                        </v-list-item>
                      </div>
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
        <v-card v-else-if="menu === 'accountTab'">
          <v-container>
            <v-row>
              <v-col>
                <v-form ref="form">
                  <InputFormEmail :email.sync="params.user.email" />
                  <InputFormPassword :password.sync="params.user.password" />
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <!-- デバッグ用コード -->
    <!-- <div>
      <v-card class="my-4" color="grey lighten-2">
        <v-card-tit>変更後</v-card-tit>
        <v-card-text>params: {{ params }}</v-card-text>
        <v-card-text>params.user.name: {{ params.user.name }}</v-card-text>
        <v-card-text>params.user.email: {{ params.user.email }}</v-card-text>
        <v-card-text>params.user.profile: {{ params.user.profile }}</v-card-text>
        <v-card-text>params.user.checkedGenres: {{ params.user.checkedGenres }}</v-card-text>
        <v-card-text>params.user.avatar: {{ params.user.avatar }}</v-card-text>
        <v-card-text>changeTargetLists: {{ changeTargetLists }}</v-card-text>
      </v-card>
      <v-card class="my-4" color="grey lighten-2">
        <v-card-tit>変更前</v-card-tit>
        <v-card-text>beforeParams: {{ beforeParams }}</v-card-text>
        <v-card-text>beforeParams.user.name: {{ beforeParams.user.name }}</v-card-text>
        <v-card-text>beforeParams.user.email: {{ beforeParams.user.email }}</v-card-text>
        <v-card-text>beforeParams.user.profile: {{ beforeParams.user.profile }}</v-card-text>
        <v-card-text>beforeParams.user.checkedGenres: {{ beforeParams.user.checkedGenres }}</v-card-text>
        <v-card-text>beforeParams.user.avatar: {{ beforeParams.user.avatar }}</v-card-text>
      </v-card>
      {{ userAvatar }}
    </div> -->
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
      beforeParams: {
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
      changeTargetLists: [],
      dialog: false,
      isChanging: false
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'modules/user/currentUser'
    }),
    displayCheckedGenres () {
      if (this.params.user.checkedGenres.length) {
        return this.params.user.checkedGenres.join('・')
      } else {
        return 'なし'
      }
    },
    userAvatar () {
    // if (!this.currentUser.length) {
    //   return 'http://localhost:3000' + this.beforeParams.user.avatar
    // } else {
      return 'http://localhost:3000' + this.currentUser.avatar.url
    // }
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
    // ==================================================
    // 変更データ送信後のリセット
    // ==================================================
    formReset () {
      this.dialog = false
      this.isChanging = false
      // 参照を解除するためにJSON.parseにて複製
      this.beforeParams = JSON.parse(JSON.stringify(this.params))
      // JSON.parseで反映されないので暫定的に直接代入
      this.beforeParams.user.avatar = this.params.user.avatar
      // Object.assign({}, this.params)
    },
    // ==================================================
    // 変更データ項目のセット
    // ==================================================
    setChangeTargetLists (afterParam, beforeParam, paramStr) {
      // String型の項目 => 変更あり・未登録のとき追加、変更なし・登録済みのとき削除
      if (!Array.isArray(afterParam)) {
        if (afterParam !== beforeParam) {
          if (!this.changeTargetLists.includes(paramStr)) {
            this.changeTargetLists.push(paramStr)
          }
        } else if (afterParam === beforeParam) {
          if (this.changeTargetLists.includes(paramStr)) {
            const idx = this.changeTargetLists.findIndex((target) => { return target === paramStr })
            this.changeTargetLists.splice(idx, 1)
          }
        }
      // Array型の項目 => 変更あり・未登録のとき追加、変更なし・登録済みのとき削除
      } else if (Array.isArray(afterParam)) {
        // const isChanged = afterParam.map((aParam) => { return beforeParam.includes(aParam) }).includes(false)
        const isChanged = JSON.stringify(afterParam.sort()) !== JSON.stringify(beforeParam.sort())
        if (isChanged) {
          if (!this.changeTargetLists.includes(paramStr)) {
            this.changeTargetLists.push(paramStr)
          }
        } else if (!isChanged) {
          if (this.changeTargetLists.includes(paramStr)) {
            const idx = this.changeTargetLists.findIndex((target) => { return target === paramStr })
            this.changeTargetLists.splice(idx, 1)
          }
        }
      }
    },
    changeTarget () {
      this.setChangeTargetLists(this.params.user.name, this.beforeParams.user.name, 'name')
      this.setChangeTargetLists(this.params.user.profile, this.beforeParams.user.profile, 'profile')
      this.setChangeTargetLists(this.params.user.avatar, this.beforeParams.user.avatar, 'avatar')
      this.setChangeTargetLists(this.params.user.checkedGenres, this.beforeParams.user.checkedGenres, 'checkedGenres')
    },
    // ==================================================
    // 変更データの送信
    // ==================================================
    submitChangedData () {
      const formData = new FormData()
      if (this.changeTargetLists.includes('name')) {
        formData.append('user[name]', this.params.user.name)
      }
      if (this.changeTargetLists.includes('profile')) {
        formData.append('user[profile]', this.params.user.profile)
      }
      if (this.changeTargetLists.includes('avatar')) {
        formData.append('user[avatar]', this.params.user.avatar)
      }
      if (this.changeTargetLists.includes('checkedGenres')) {
        if (this.params.user.checkedGenres.length) {
          this.params.user.checkedGenres.forEach((genre) => {
            formData.append('user[genres][]', genre)
          })
        }
      }
      const config = {
        headders: {
          'content-type': 'multipart/form-data'
        }
      }
      this.changeProfile({ formData, config })
      this.formReset()
    }
  },
  // ==================================================
  // 既存データロード
  // ==================================================
  // プロフィール画像をリアクティブに表示するためcurrentUserから取得
  async fetch ({ store }) {
    await store.dispatch('modules/user/getCurrentUser')
  },
  async asyncData ({ $axios, store }) {
    const userObj = await $axios.$get(`/api/v1/users/${store.state.user.current.id}`)
    const genresArray = await $axios.$get('/api/v1/genres')
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
      // 変更前データとして格納
      beforeParams: {
        user: {
          name: userObj.name,
          email: userObj.email,
          profile: userObj.profile,
          checkedGenres: userObj.genres.map((g) => { return g.genre_name }),
          avatar: userObj.avatar.url
        }
      },
      genres: genresArray
    }
  }
}
</script>
