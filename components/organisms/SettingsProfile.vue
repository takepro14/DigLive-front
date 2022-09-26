<template>
  <v-card >
    <v-container>
      <v-row>
        <v-col>
          <v-form ref="form">
            <v-col class="text-center">
              <!-- プロフィール画像表示 -->
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
            <!-- 設定入力 -->
            <InputFormName
              :name.sync="setName"
            />
            <InputFormProfile
              :profile.sync="setProfile"
            />
            <InputFormAvatar
              :avatar.sync="setAvatar"
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
                :checkedGenres="setCheckedGenres"
                @formGenreCheckedEvent="formGenreChecked"
                @formGenreUncheckedEvent="formGenreUnchecked"
              />
            </v-card-text>
            <!-- /設定入力 -->
            <SettingProfileChangeDialog
              :name="name"
              :profile="profile"
              :avatar="avatar"
              :changeTargetLists="changeTargetLists"
              :displayCheckedGenres="displayCheckedGenres"
              @changeTargetEvent="changeTarget"
              @submitChangedDataEvent="submitChangedData"
            />
          </v-form>
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
  </v-card>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  props: {
    currentUser: {
      type: Object
    },
    genres: {
      type: Array
    },
    name: {
      type: String
    },
    profile: {
      type: String
    },
    avatar: {
      type: String
    },
    checkedGenres: {
      type: Array
    },
    changeTargetLists: {
      type: Array
    },
    displayCheckedGenres: {
      // なし、になる場合もあるため
      type: [Array, String]
    }
  },
  computed: {
    // ...mapGetters({
    //   currentUser: 'modules/user/currentUser'
    // }),
    userAvatar () {
      return 'http://localhost:3000' + this.currentUser.avatar.url
    },
    setName: {
      get () { return this.name },
      set (value) { this.$emit('update:name', value) }
    },
    setProfile: {
      get () { return this.profile },
      set (value) { this.$emit('update:profile', value) }
    },
    setAvatar: {
      get () { return this.avatar },
      set (value) { this.$emit('update:avatar', value) }
    },
    setCheckedGenres: {
      get () { return this.checkedGenres },
      set (value) { this.$emit('update:checkedGenres', value) }
    }
  },
  methods: {
    changeTarget () {
      this.$emit('changeTargetEvent')
    },
    submitChangedData () {
      this.$emit('submitChangedDataEvent')
    },
    formGenreChecked (value) {
      this.$emit('formGenreCheckedEvent', value)
    },
    formGenreUnchecked (value) {
      this.$emit('formGenreUncheckedEvent', value)
    }
  }
}
</script>
