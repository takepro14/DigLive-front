<template>
  <UserFormCard>
    <template
      #user-form-card-content
    >
      <v-form
        ref="form"
        v-model="isValid"
      >
        <UserFormCardName
          :name.sync="params.user.name"
        />
        <UserFormCardEmail
          :email.sync="params.user.email"
          placeholder
        />
        <UserFormCardPassword
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
  </UserFormCard>
</template>

<script>
export default {
  layout: 'not-logged-in',
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
