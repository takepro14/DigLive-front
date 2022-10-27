<template>
  <v-textarea
    v-model="setProfile"
    :counter="maxLengthProfile"
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
  data () {
    const maxLengthProfile = 200
    return {
      maxLengthProfile,
      rules: [
        v => ((!v) || (!!v && maxLengthProfile >= v.length)) || `${maxLengthProfile}文字以内で入力してください`
      ]
    }
  },
  computed: {
    setProfile: {
      get () { return this.profile },
      set (newVal) { return this.$emit('update:profile', newVal) }
    }
  }
}
</script>
