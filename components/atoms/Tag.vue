<template>
  <v-chip
    link
    filter
    color="tag"
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
      if (this.isChecked === true) {
        this.$emit('formTagCheckedEvent', this.tag.tag_name)
      } else {
        this.$emit('formTagUncheckedEvent')
      }
    }
  }
}
</script>
