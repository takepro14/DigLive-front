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
        />
      </v-col>
    </v-row>
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
        user: {
          name: '',
          profile: '',
          avatar: '',
          checkedGenres: []
        }
      },
      beforeParams: {
        user: {
          name: '',
          profile: '',
          avatar: '',
          checkedGenres: []
        }
      },
      // 仮
      paramsAccount: {
        user: {
          email: '',
          password: '',
          activated: true
        }
      },
      beforeParamsAccount: {
        user: {
          email: '',
          password: '',
          activated: true
        }
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
    // ==================================================
    // プロフィール用
    // ==================================================
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
