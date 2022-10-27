<template>
  <v-chip
    small
    link
    filter
    label
    color="genre"
    @click="toggleGenre"
  >
    {{ genre.genre_name }}
  </v-chip>
</template>

<script>
export default {
  props: {
    genre: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isChecked: false
    }
  },
  methods: {
    toggleGenre () {
      this.isChecked = !this.isChecked
      this.isChecked
        ? this.$emit('formGenreCheckedEvent', this.genre.genre_name)
        : this.$emit('formGenreUncheckedEvent', this.genre.genre_name)
    },
    resetFormGenre () {
      this.isChecked = false
    }
  }
}
</script>
