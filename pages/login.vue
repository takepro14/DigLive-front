<template>
  <v-container
    fluid
    class="px-8 pt-2"
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
            :disabled="!isValid || loading"
            :loading="loading"
            block
            color="button white--text"
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
          email: 'test-user1@example.com',
          password: 'password'
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
          .then((response) => {
            this.$store.dispatch('getToast', { msg: 'ログインしました' })
            this.$auth.login(response)
            this.$router.push(this.redirectPath)
            this.$router.dispatch('getRememberPath', this.LoggedInHomePath)
          })
          .catch((error) => {
            if (error && error.status === 404) {
              return this.$store.dispatch('getToast', { msg: 'ユーザが見つかりません' })
            }
          })
      }
      this.loading = false
    }
  }
}
</script>
