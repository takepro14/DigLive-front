<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col>
          <v-form ref="form">
            <InputFormEmail
              :email.sync="setEmail"
            />
            <InputFormPassword
              :password.sync="setPassword"
            />
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    email: {
      type: String
    },
    password: {
      type: String
    }
  },
  computed: {
    setEmail: {
      get () { return this.email },
      set (value) { this.$emit('update:email', value) }
    },
    setPassword: {
      get () { return this.password },
      set (value) { this.$emit('update:password', value) }
    }
  }
}
</script>
