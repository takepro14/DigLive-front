<template>
<div>
  <v-text-field
    v-model="setEmail"
    :rules="rules"
    label="メールアドレスを入力"
    :placeholder="placeholder ? 'your@email.com' : undefined"
    outlined
  />
</div>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: ''
    },
    placeholder: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      rules: [
        // 必須チェック
        v => !!v || '',
        // 書式チェック
        v => /.+@.+\..+/.test(v) || ''
      ]
    }
  },
  computed: {
    setEmail: {
      get () { return this.email },
      set (newVal) { return this.$emit('update:email', newVal) }
    }
  }

}
</script>
