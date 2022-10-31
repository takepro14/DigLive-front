<template>
  <div>
    <!-- アイキャッチ画像 -->
    <div>
      <v-img
        dark
        src="image/top.png"
        :height="imgHeight"
      >
        <v-row
          class="d-flex align-center pb-16 px-4"
          :style="{ height: `${imgHeight}px` }"
        >
          <v-col
            class="text-center pb-16"
          >
            <h1 class="text-h3 title mb-4">
              {{ appName }}
            </h1>
            <h3
              class="mb-4"
              :style="{ letterSpacing: '6px' }"
            >
              ライブ映像共有型SNS
            </h3>
            <div
              :style="{ letterSpacing: '2px' }"
            >
              音源ではわからないアーティストの魅力をYouTubeのライブ映像で共有しよう
            </div>
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
          </v-col>
        </v-row>
      </v-img>
    </div>
    <!-- 利用イメージ -->
    <!-- アプリ紹介 -->
    <div>
      <v-container>
        <v-row align="center">
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
            xl="4"
            class="mb-12"
            v-for="content in contents"
            :key="content.id"
          >
            <v-card
              class="mx-auto wrap-text"
              max-width="600"
              flat
            >
              <v-list-item>
                <v-list-item-content>
                  <div class="pb-6">
                    <v-img
                      height="300"
                      max-width="300"
                      :src="content.image"
                      contain
                    />
                  </div>
                  <v-list-item-title
                    class="text-h4 header--text font-weight-bold mb-4"
                  >
                    {{ content.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    class="header--text"
                  >
                    <div>
                      {{ content.subtitle1 }}
                    </div>
                    <br>
                    <div>
                      {{ content.subtitle2 }}
                    </div>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
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
      },
      contents: [
        {
          image: require('@/static/image/share.svg'),
          title: 'ライブ映像をシェアしよう',
          subtitle1: 'CD音源はピンと来なかったけど、ライブ映像を見てハマった経験はありませんか？',
          subtitle2: 'そんな素晴らしいライブ映像を、YouTubeから手軽にシェアしましよう！'
        },
        {
          image: require('@/static/image/dig.svg'),
          title: 'ライブ映像を発掘しよう',
          subtitle1: 'みんなの投稿から、気になったライブ映像を視聴してみましょう。',
          subtitle2: '新しい音楽にハマるきっかけができるかもしれません。'
        },
        {
          image: require('@/static/image/follow.svg'),
          title: 'フォローして見つけよう',
          subtitle1: '自分と同じ趣味の人は音楽ジャンルのタグで検索可能。',
          subtitle2: 'その人がどんな音楽を聴いているか、チェックしてみましょう。'
        }
      ]
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
/* テキストを省略せず折り返し */
.wrap-text * {
  word-break: break-all;
  white-space: normal;
}

.title {
  font-family: 'Audiowide', cursive !important;
}
</style>
