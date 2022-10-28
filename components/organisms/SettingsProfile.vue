<template>
  <v-card >
    <v-container>
      <v-row>
        <v-col class="mb-6">
          <v-form
            ref="form"
            v-model="isValid"
          >
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
            <SettingsProfileChangeDialog
              :isValid="isValid"
              :name="name"
              :profile="profile"
              :avatar="avatar"
              :changeTargetLists="changeTargetLists"
              :displayCheckedGenres="displayCheckedGenres"
              :currentUser="currentUser"
              @changeTargetEvent="changeTarget"
              @submitChangedDataEvent="submitChangedData"
            />
          </v-form>
        </v-col>
      </v-row>
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
  data () {
    return {
      isValid: false
    }
  },
  computed: {
    userAvatar () {
      return this.currentUser.avatar.url
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
