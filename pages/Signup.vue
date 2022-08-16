<template>
  <user-form-card>
    <template
      #user-form-card-content
    >
      <v-form
        ref="form"
        v-model="isValid"
      >
        <user-form-name
          :name.sync="params.user.name"
        />
        <user-form-email
          :email.sync="params.user.email"
          placeholder
        />
        <user-form-password
          :password.sync="params.user.password"
          setValidation
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
      {{ params }}
    </template>
  </user-form-card>
</template>

<script>
export default {
  layout: 'before-login',
  data () {
    return {
      isValid: false,
      loading: false,
      params: { user: { name: '', email: '', password: '' } }
    }
  },
  methods: {
    signup () {
      this.loading = true
      setTimeout(() => (
        this.loading = false
      ), 1500)
    }
  }
}
</script>
