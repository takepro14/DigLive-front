<template>
  <v-container
    class="px-8 mt-8"
  >
    <InputForm>
      <template #user-form-card-content>
        <v-form
          ref="form"
          v-model="isValid"
        >
          <InputFormEmail
            :email.sync="params.auth.email"
          />
          <InputFormPassword
            :password.sync="params.auth.password"
            set-validation-login
          />
          <v-btn
            class="mt-8"
            block
            color="button white--text"
            :disabled="!isValid || loading"
            :loading="loading"
            @click="login"
          >
            ログインする
          </v-btn>
        </v-form>
      </template>
    </InputForm>
  </v-container>
</template>

<script>
export default {
  layout: 'not-logged-in',
  data ({ $store }) {
    return {
      isValid: false,
      loading: false,
      params: {
        auth: {
          email: '',
          password: ''
        }
      },
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
      this.$store.dispatch('getToast', { msg: 'ログインしました' })
      this.$auth.login(response)
      this.$router.push(this.redirectPath)
      this.$router.dispatch('getRememberPath', this.LoggedInHomePath)
    },
    authFailure ({ response }) {
      console.log('response: ' + JSON.stringify(response))
      if (response && response.status === 404) {
        const msg = 'ユーザが見つかりません'
        return this.$store.dispatch('getToast', { msg })
      }
    }
  }
}
</script>
