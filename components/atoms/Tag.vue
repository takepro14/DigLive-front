<template>
  <v-chip
    link
    filter
    small
    label
    color="tag"
    text-color="button"
    @click="toggleTag"
  >
    {{ tag.tag_name }}
  </v-chip>
</template>

<script>
export default {
  data () {
    return {
      isChecked: false
    }
  },
  props: {
    tag: {
      type: Object
    }
  },
  methods: {
    toggleTag () {
      this.isChecked = !this.isChecked
      this.isChecked
        ? this.$emit('formTagCheckedEvent', this.tag.tag_name)
        : this.$emit('formTagUncheckedEvent')
    },
    // 他のタグが選ばれた時に自身をfalseにする
    resetFormTag (nowCheckedTagName) {
      if (this.tag.tag_name !== nowCheckedTagName) {
        this.isChecked = false
      }
    }
  }
}
</script>
