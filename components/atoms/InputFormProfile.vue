<template>
  <v-textarea
    v-model="setProfile"
    :counter="max"
    :rules="rules"
    label="プロフィール入力"
    placeholder="あなたのプロフィール"
    outlined
  />
</template>

<script>
export default {
  props: {
    profile: {
      type: String,
      default: ''
    }
  },
  // data () {
  //   const max = 200
  //   return {
  //     max,
  //     rules: [
  //       v => (this.max >= v.length) || `${this.max}文字以内で入力してください`
  //     ]
  //   }
  // },
  computed: {
    setProfile: {
      get () { return this.profile },
      set (newVal) { return this.$emit('update:profile', newVal) }
    }
  }
}
</script>
