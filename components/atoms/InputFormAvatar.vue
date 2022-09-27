<template>
  <v-file-input
    v-model="setAvatar"
    label="プロフィール画像を選択"
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
