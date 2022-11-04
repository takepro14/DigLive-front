<template>
  <v-chip
    link
    filter
    small
    label
    color="genre"
    text-color="header"
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
    // 他のジャンルが選ばれた時に自身をfalseにする
    resetFormGenre (nowCheckedGenreName) {
      if (this.genre.genre_name !== nowCheckedGenreName) {
        this.isChecked = false
      }
    }
  }
}
</script>
