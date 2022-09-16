<template>
  <InputForm>
    <template
      #user-form-card-content
    >
      <v-form
        ref="form"
        v-model="isValid"
      >
        <InputFormEmail
          :email.sync="params.auth.email"
        />
        <InputFormPassword
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
          <v-btn
            :disabled="!isValid || loading"
            :loading="loading"
            block
            color="button white--text"
            @click="login"
          >
            ログインする
          </v-btn>
        </v-card-text>
      </v-form>
    </template>
  </InputForm>
</template>

<script>
export default {
  layout: 'not-logged-in',
  data ({ $store }) {
    return {
      isValid: false,
      loading: false,
      params: { auth: { email: 'test-user1@example.com', password: 'password' } },
      redirectPath: $store.state.LoggedIn.rememberPath,
      LoggedInHomePath: $store.state.LoggedIn.homePath
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
      this.$router.dispatch('getRememberPath', this.LoggedInHomePath)
    },
    authFailure ({ response }) {
      if (response && response.status === 404) {
        // トースター出力
        const msg = 'ユーザが見つかりません'
        return this.$store.dispatch('getToast', { msg })
      }
    }
  }
}
</script>
