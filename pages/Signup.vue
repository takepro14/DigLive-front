<template>
  <InputForm>
    <template
      #user-form-card-content
    >
      <v-form
        ref="form"
        v-model="isValid"
      >
        <InputFormName
          :name.sync="params.user.name"
        />
        <InputFormEmail
          :email.sync="params.user.email"
          placeholder
        />
        <InputFormPassword
          :password.sync="params.user.password"
          set-validation
        />
        <v-btn
          :disabled="!isValid || loading"
          :loading="loading"
          block
          color="blue lighten-2"
          class="white--text"
          @click="signup"
        >
          登録する
        </v-btn>
      </v-form>
    </template>
  </InputForm>
</template>

<script>
export default {
  layout: 'not-logged-in',
  data () {
    return {
      isValid: false,
      loading: false,
      // TODO: activatedはメール認証にする
      params: { user: { name: 'たけ', email: 'test-user999@example.com', password: 'password', activated: true } }
    }
  },
  computed: {
    // 新規登録後のログインリクエストパラメータ
    loginParams () {
      const params = { auth: { email: this.params.user.email, password: this.params.user.password } }
      return params
    }
  },
  methods: {
    async signup () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('/api/v1/users', this.params, { withCredentials: true })
          .then((response) => {
            console.log('新規ユーザpost後のresponse: ' + JSON.stringify(response))
            // ログイン認証
            this.$axios.$post('/api/v1/auth_token', this.loginParams, { withCredentials: true })
              .then((response) => {
                console.log('認証post後のresponse: ' + JSON.stringify(response))
                this.createSuccessful(response)
              })
              .catch(error => console.log(error))
          })
          // .catch(error => this.createFailure(error))
      }
      this.loading = false
    },
    // 成功した時、ログイン処理に移行
    createSuccessful (response) {
      this.$auth.login(response)
      this.$router.push('/posts')
    }
  }
}
</script>
