<template>
  <div>
    <!-- セクション1 -->
    <v-img
      dark
      src="image/top.png"
      :height="imgHeight"
    >
      <v-row
        class="d-flex align-center pb-16 px-4"
        :style="{ height: `${imgHeight}px` }"
      >
        <!-- コピー -->
        <v-col
          class="text-center pb-16"
        >
          <h1 class="text-h2 font-weight-bold title mb-4">
            {{ appName }}
          </h1>
          <h2
            class="subheading mb-4"
            :style="{ letterSpacing: '6px' }"
          >
            ライブ映像共有型SNS
          </h2>
          <div
            class="font-weight-bold"
            :style="{ letterSpacing: '3px' }"
          >
            音源ではわからないアーティストの魅力をYouTubeのライブ映像で共有しよう
          </div>
          <!-- /コピー -->
          <!-- ゲストログイン -->
          <v-btn
            class="mt-8 font-weight-bold"
            color="button"
            x-large
            rounded
            depressed
            :disabled="loading"
            :loading="loading"
            @click="guestLogin"
          >
            お試しで使ってみる
          </v-btn>
          <!-- /ゲストログイン -->
        </v-col>
      </v-row>
    </v-img>
    <!-- /セクション1 -->
    <!-- セクション2 -->
    <div class="header--text">
      <v-row align="center">
        <v-col cols="12" sm="12" md="12" lg="12" xl="4">
          <v-list-item-content class="text-center">
            <div class="pa-12">
              <v-img
                max-height="300px"
                height="100%"
                src="image/share.svg"
                contain
              />
            </div>
            <v-list-item-title class="text-h4 font-weight-bold mb-4">
              ライブ映像をシェアしよう
            </v-list-item-title>
            <v-list-item-subtitle class="text-h6">
              <small>
                CD音源はピンと来なかったけど、ライブ映像を見てハマった経験はありませんか？
              </small>
              <br>
              <small>
                そんな素晴らしいライブ映像を、YouTubeから手軽にシェアしましよう！
              </small>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="12" xl="4">
          <v-list-item-content class="text-center">
            <div class="pa-12">
              <v-img
                height="300"
                src="image/dig.svg"
                contain
              />
            </div>
            <v-list-item-title class="text-h4 font-weight-bold mb-4">
              ライブ映像を発掘しよう
            </v-list-item-title>
            <v-list-item-subtitle class="text-h6">
              <small>
                みんなの投稿から、気になったライブ映像を視聴してみましょう。
              </small>
              <br>
              <small>
                新しい音楽にハマるきっかけができるかもしれません。
              </small>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="12" xl="4">
          <v-list-item-content class="text-center">
            <div class="pa-12">
              <v-img
                height="300"
                src="image/follow.svg"
                contain
              />
            </div>
            <v-list-item-title class="text-h4 font-weight-bold mb-4">
              フォローして見つけよう
            </v-list-item-title>
            <v-list-item-subtitle class="text-h6">
              <small>
                自分と同じ趣味の人は音楽ジャンルのタグで検索可能。
              </small>
              <br>
              <small>
                その人がどんな音楽を聴いているか、チェックしてみましょう。
              </small>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-col>
      </v-row>
    </div>
    <!-- /セクション2 -->
  </div>
</template>

<script>
export default {
  layout: 'not-logged-in',
  data ({ $config: { appName } }) {
    return {
      imgHeight: '800',
      appName,
      loading: false,
      params: {
        auth: {
          email: '',
          password: ''
        }
      },
      guestParams: {
        user: {
          name: 'ゲストユーザー',
          email: '',
          password: '',
          activated: true
        }
      }
    }
  },
  methods: {
    getGuestParams () {
      const hex = Math.random().toString(16).slice(-8)
      this.guestParams.user.email = hex + '@guest.com'
      this.guestParams.user.password = hex
    },
    setGuestParams () {
      this.params.auth.email = this.guestParams.user.email
      this.params.auth.password = this.guestParams.user.password
    },
    async guestLogin () {
      this.getGuestParams()
      this.loading = true
      await this.$axios.$post('/api/v1/users', this.guestParams, { withCredentials: true })
        .then(() => {
          this.setGuestParams()
          this.$axios.$post('/api/v1/auth_token', this.params, { withCredentials: true })
            .then((response) => {
              this.$store.dispatch('getToast', { msg: 'ゲストユーザーでログインしました' })
              this.$auth.login(response)
              this.$router.push('/home')
            })
            .catch((error) => {
              console.log(error)
            })
        })
      this.loading = false
    }
  }
}
</script>

<style scoped>
.title {
  font-family: 'Audiowide', cursive !important;
}
</style>
