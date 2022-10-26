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
          <v-btn
            class="mt-8"
            :disabled="!isValid || loading"
            :loading="loading"
            block
            color="button white--text"
            @click="guestLogin"
            height="60px"
          >
            ゲストログインする<br>
            ※採用担当者様向け
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
          // ToDo: あとで値を削除する
          email: 'test-user1@example.com',
          password: 'password'
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
      redirectPath: $store.state.LoggedIn.rememberPath,
      LoggedInHomePath: $store.state.LoggedIn.homePath
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
    },
    async guestLogin () {
      this.getGuestParams()
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('/api/v1/users', this.guestParams, { withCredentials: true })
          .then(() => {
            this.setGuestParams()
            this.$axios.$post('/api/v1/auth_token', this.params, { withCredentials: true })
              .then((userObj) => {
                this.$store.dispatch('getToast', { msg: 'ゲストユーザーでログインしました' })
                this.$auth.login(userObj)
                this.$router.push('/home')
              })
              .catch((error) => {
                console.log(error)
              })
          })
      }
      this.loading = false
    }
  }
}
</script>
