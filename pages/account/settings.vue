<template>
  <v-container class="pa-2">
    <Toaster />
    <HistoryBack class="py-4" />
    <v-row>
      <v-col>
        <SettingsTabMenu
          :tab="tab"
          :tabs="tabs"
          @tabClickEvent="tabClick"
        />
        <SettingsProfile
          v-if="isProfileTab"
          :currentUser="currentUser"
          :genres="genres"
          :name.sync="setName"
          :profile.sync="setProfile"
          :avatar.sync="setAvatar"
          :checkedGenres="setCheckedGenres"
          @formGenreCheckedEvent="formGenreChecked"
          @formGenreUncheckedEvent="formGenreUnchecked"
          :changeTargetLists="changeTargetLists"
          @changeTargetEvent="changeTarget"
          :displayCheckedGenres="displayCheckedGenres"
          @submitChangedDataEvent="submitChangedData"
        />
        <SettingsAccount
          v-else-if="isAccountTab"
          :email.sync="setEmail"
          :password.sync="setPassword"
          :changeTargetLists="changeTargetLists"
          @changeTargetEvent="changeTarget"
          @submitChangedDataEvent="submitChangedData"
        />
      </v-col>
    </v-row>
    <!-- デバッグ用コード -->
    <div>
      <v-card class="my-4" color="grey lighten-2">
        <v-card-title>changeTargetLists</v-card-title>
        <v-card-text>{{ changeTargetLists }}</v-card-text>
        <div v-if="isProfileTab">
          <v-card-title>params.user.name</v-card-title>
          <v-card-text>{{ params.user.name }}</v-card-text>
          <v-card-title>params.user.email</v-card-title>
          <v-card-text>{{ params.user.email }}</v-card-text>
          <v-card-title>params.user.profile</v-card-title>
          <v-card-text>{{ params.user.profile }}</v-card-text>
          <v-card-title>params.user.checkedGenres</v-card-title>
          <v-card-text>{{ params.user.checkedGenres }}</v-card-text>
          <v-card-title>params.user.avatar</v-card-title>
          <v-card-text>{{ params.user.avatar }}</v-card-text>
          <v-card-title>params(all)</v-card-title>
          <v-card-text>{{ params }}</v-card-text>
        </div>
        <div v-else-if="isAccountTab">
          <v-card-title>accountParams.user.email</v-card-title>
          <v-card-text>{{ accountParams.user.email }}</v-card-text>
          <v-card-title>accountParams.user.password</v-card-title>
          <v-card-text>{{ accountParams.user.password }}</v-card-text>
          <v-card-title>accountParams(all)</v-card-title>
          <v-card-text>{{ accountParams }}</v-card-text>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      tab: 'profileTab',
      tabs: [
        { title: 'プロフィール', name: 'profileTab' },
        { title: 'アカウント', name: 'accountTab' }
      ],
      params: {
        user: { name: '', profile: '', avatar: '', checkedGenres: [] }
      },
      beforeParams: {
        user: { name: '', profile: '', avatar: '', checkedGenres: [] }
      },
      accountParams: {
        user: { email: '', password: '' }
      },
      beforeAccountParams: {
        user: { email: '', password: '' }
      },
      // 変更対象項目名が格納される配列
      changeTargetLists: [],
      isGenreChanged: false
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'modules/user/currentUser'
    }),
    isProfileTab () {
      return this.tab === 'profileTab'
    },
    isAccountTab () {
      return this.tab === 'accountTab'
    },
    displayCheckedGenres () {
      if (this.params.user.checkedGenres.length) {
        return this.params.user.checkedGenres.join('・')
      } else {
        return 'なし'
      }
    },
    setName: {
      get () { return this.params.user.name },
      set (value) { this.params.user.name = value }
    },
    setProfile: {
      get () { return this.params.user.profile },
      set (value) { this.params.user.profile = value }
    },
    setAvatar: {
      get () { return this.params.user.avatar },
      set (value) { this.params.user.avatar = value }
    },
    setCheckedGenres: {
      get () { return this.params.user.checkedGenres },
      set (value) { this.params.user.checkedGenres = value }
    },
    setEmail: {
      get () { return this.accountParams.user.email },
      set (value) { this.accountParams.user.email = value }
    },
    setPassword: {
      get () { return this.accountParams.user.password },
      set (value) { this.accountParams.user.password = value }
    },
    isNoChanged () {
      return !this.changeTargetLists.length
    },
    isChanged () {
      return (target) => {
        return this.changeTargetLists.includes(target)
      }
    }
  },
  watch: {
    tab () {
      // Profile, Accountでロジックを流用しているためタブが変わったらリセット
      this.changeTargetLists = []
      // TODO: 入力内容もクリアするか？
    }
  },
  methods: {
    ...mapActions({
      changeProfile: 'modules/user/changeProfile',
      getCurrentUser: 'modules/user/getCurrentUser'
    }),
    tabClick (tabName) {
      this.tab = tabName
    },
    formGenreChecked (value) {
      if (!this.isGenreChanged) {
        this.isGenreChanged = true
        this.params.user.checkedGenres = []
        this.params.user.checkedGenres.push(value)
      } else if (this.isGenreChanged) {
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
      this.isGenreChanged = false
      // 参照を解除するためにJSON.parseにて複製
      this.beforeParams = JSON.parse(JSON.stringify(this.params))
      // JSON.parseで反映されないので暫定的に直接代入
      this.beforeParams.user.avatar = this.params.user.avatar
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
      if (this.isProfileTab) {
        this.setChangeTargetLists(this.params.user.name, this.beforeParams.user.name, 'name')
        this.setChangeTargetLists(this.params.user.profile, this.beforeParams.user.profile, 'profile')
        this.setChangeTargetLists(this.params.user.avatar, this.beforeParams.user.avatar, 'avatar')
        this.setChangeTargetLists(this.params.user.checkedGenres, this.beforeParams.user.checkedGenres, 'checkedGenres')
      } else if (this.isAccountTab) {
        this.setChangeTargetLists(this.accountParams.user.email, this.beforeAccountParams.user.email, 'email')
        this.setChangeTargetLists(this.accountParams.user.password, this.beforeAccountParams.user.password, 'password')
      }
    },
    // ==================================================
    // 変更データの作成・送信
    // ==================================================
    submitChangedData () {
      const formData = new FormData()
      if (this.isProfileTab) {
        if (this.isChanged('name')) { formData.append('user[name]', this.params.user.name) }
        if (this.isChanged('profile')) { formData.append('user[profile]', this.params.user.profile) }
        if (this.isChanged('avatar')) { formData.append('user[avatar]', this.params.user.avatar) }
        if (this.isChanged('checkedGenres')) {
          if (this.params.user.checkedGenres.length) {
            this.params.user.checkedGenres.forEach((genre) => {
              formData.append('user[genres][]', genre)
            })
          }
        }
      } else if (this.isAccountTab) {
        if (this.isChanged('email')) { formData.append('user[email]', this.accountParams.user.email) }
        if (this.isChanged('password')) { formData.append('user[password]', this.accountParams.user.password) }
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
  // ==================================================n
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
          profile: userObj.profile,
          checkedGenres: userObj.genres.map((g) => { return g.genre_name }),
          avatar: userObj.avatar.url
        }
      },
      beforeParams: {
        user: {
          name: userObj.name,
          profile: userObj.profile,
          checkedGenres: userObj.genres.map((g) => { return g.genre_name }),
          avatar: userObj.avatar.url
        }
      },
      genres: genresArray,
      accountParams: {
        user: {
          email: userObj.email,
          password: ''
        }
      },
      beforeAccountParams: {
        user: {
          email: userObj.email,
          password: ''
        }
      }
    }
  }
}
</script>
