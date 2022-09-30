<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col>
          <v-form
            ref="form"
            v-model="isValid"
          >
            <InputFormEmail
              :email.sync="setEmail"
            />
            <InputFormPassword
              :password.sync="setPassword"
            />
            <div class="mt-6">
              <SettingsAccountChangeDialog
                :isValid="isValid"
                :email="email"
                :password="password"
                :changeTargetLists="changeTargetLists"
                @changeTargetEvent="changeTarget"
                @submitChangedDataEvent="submitChangedData"
              />
            </div>
            <div class="mt-6">
              <SettingsAccountDestroyDialog
                @destroyAccountEvent="destroyAccount"
              />
            </div>
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
    },
    changeTargetLists: {
      type: Array
    }
  },
  data () {
    return {
      isValid: false
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
  },
  methods: {
    changeTarget () {
      this.$emit('changeTargetEvent')
    },
    submitChangedData () {
      this.$emit('submitChangedDataEvent')
      this.dialog = false
    },
    destroyAccount () {
      this.$emit('destroyAccountEvent')
    }
  }
}
</script>
