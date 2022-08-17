<template>
  <user-form-card>
    <template
      #user-form-card-content
    >
      <v-form
        ref="form"
        v-model="isValid"
      >
        <user-form-email
          :email.sync="params.auth.email"
        />
        <user-form-password
          :password.sync="params.auth.password"
        />
        <v-card-actions>
          <nuxt-link
            to="#"
            class="body-2 text-decoration-none"
          >
            パスワードを忘れた？
          </nuxt-link>
        </v-card-actions>
        <v-card-text
          class="px-0"
        >
          <!-- 初期状態orローディング中はdisableにする -->
          <v-btn
            :disabled="!isValid || loading"
            :loading="loading"
            block
            color="blue lighten-2"
            class="white--text"
            @click="login"
          >
            ログインする
          </v-btn>
        </v-card-text>
      </v-form>
      {{ params }}
    </template>
  </user-form-card>
</template>

<script>
export default {
  layout: 'before-login',
  data ({ $store }) {
    return {
      isValid: false,
      loading: false,
      params: { auth: { email: 'melvin_weimann@crist-medhurst.org', password: 'password' } },
      redirectPath: $store.state.AfterLogin.rememberPath,
      AfterLoginHomePath: $store.state.AfterLogin.homePath
    }
  },
  methods: {
    async login () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('/api/v1/auth_token', this.params, { withCredentials: true })
          .then(response => this.authSuccessful(response))
          .catch(error => this.authFailure(error))
      }
      this.loading = false
    },
    authSuccessful (response) {
      this.$auth.login(response)
      // 記憶ルートにリダイレクト
      this.$router.push(this.redirectPath)
      // 記憶ルートを初期値に戻す
      this.$routet.dispatch('getRememberPath', this.AfterLoginHomePath)
    },
    authFailure ({ response }) {
      if (response && response.status === 404) {
        // トースター出力
        const msg = 'ユーザが見つかりません'
        return this.$store.dispatch('getToast', { msg })
      } else {
        // エラー処理
        alert('エラー処理')
        console.log(response)
      }
    }
  }
}
</script>
