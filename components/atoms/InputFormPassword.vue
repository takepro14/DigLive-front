<template>
  <v-text-field
    v-model="setPassword"
    :rules="form.rules"
    :hint="form.hint"
    label="パスワードを入力"
    :placeholder="form.placeholder"
    :hide-details="!setValidationSignup"
    :counter="setValidationSignup"
    :append-icon="toggle.icon"
    :type="toggle.type"
    autocomplete="on"
    @click:append="show = !show"
    outlined
  />
</template>

<script>
export default {
  props: {
    password: {
      type: String,
      default: ''
    },
    setValidationSignup: {
      type: Boolean,
      default: false
    },
    setValidationLogin: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    setPassword: {
      get () { return this.password },
      set (newVal) { return this.$emit('update:password', newVal) }
    },
    form () {
      const min = '8文字以上'
      const msg = `${min}(半角英数字･ﾊｲﾌﾝ･ｱﾝﾀﾞｰﾊﾞｰ)`
      const required = v => !!v || ''
      const format = v => /^[\w-]{8,72}$/.test(v) || msg

      const rules = this.setValidationSignup
        ? [format]
        : this.setValidationLogin
          ? [required]
          : []
      const hint = this.setValidationSignup ? msg : undefined
      const placeholder = this.setValidationSignup ? min : undefined
      return { rules, hint, placeholder }
    },
    toggle () {
      const icon = this.show ? 'mdi-eye' : 'mdi-eye-off'
      const type = this.show ? 'text' : 'password'
      return { icon, type }
    }
  }
}
</script>
