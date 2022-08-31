<template>
  <v-text-field
    v-model="setName"
    :counter="max"
    :rules="rules"
    label="ユーザー名を入力"
    placeholder="あなたの表示名"
    outlined
  />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    const max = 30
    return {
      max,
      rules: [
        // 必須チェック
        v => !!v || '',
        // 文字数チェック
        v => (!!v && max >= v.length) || `${max}文字以上で入力してください`
      ]
    }
  },
  computed: {
    setName: {
      get () { return this.name },
      set (newVal) { return this.$emit('update:name', newVal) }
    }
  }
}
</script>
