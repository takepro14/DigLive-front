<template>
  <v-file-input
    label="プロフィール画像を選択"
    v-model="setAvatar"
    accept="image/*"
    prepend-icon="mdi-camera"
  />
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      default: ''
    }
  },
  computed: {
    setAvatar: {
      get () { return this.avatar },
      set (newVal) { return this.$emit('update:avatar', newVal) }
    }
  }
}
</script>
