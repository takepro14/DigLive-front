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
          <InputFormName
            :name.sync="params.user.name"
          />
          <InputFormEmail
            :email.sync="params.user.email"
            placeholder
          />
          <InputFormPassword
            :password.sync="params.user.password"
            set-validation-signup
          />
          <v-btn
            class="mt-8"
            block
            color="button white--text"
            :disabled="!isValid || loading"
            :loading="loading"
            @click="signup"
          >
            新規登録する
          </v-btn>
        </v-form>
      </template>
    </InputForm>
  </v-container>
</template>

<script>
export default {
  layout: 'not-logged-in',
  data () {
    return {
      isValid: false,
      loading: false,
      // TODO: activatedはメール認証にする
      params: {
        user: {
          name: '',
          email: '',
          password: '',
          activated: true
        }
      }
    }
  },
  computed: {
    loginParams () {
      const params = {
        auth: {
          email: this.params.user.email,
          password: this.params.user.password
        }
      }
      return params
    }
  },
  methods: {
    async signup () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('/api/v1/users', this.params, { withCredentials: true })
          .then(() => {
            this.$axios.$post('/api/v1/auth_token', this.loginParams, { withCredentials: true })
              .then((userObj) => {
                this.$store.dispatch('getToast', { msg: '新規登録が完了しました' })
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
