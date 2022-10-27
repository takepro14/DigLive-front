<template>
  <v-text-field
    v-model="setName"
    :counter="maxLengthName"
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
    const maxLengthName = 30
    return {
      maxLengthName,
      rules: [
        // 必須チェック
        v => !!v || '',
        // 文字数チェック
        v => (!!v && maxLengthName >= v.length) || `${maxLengthName}文字以内で入力してください`
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
