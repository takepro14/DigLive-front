<template>
  <v-chip-group
    column
    multiple
  >
    <div
      v-for="genre in genres"
      :key="genre.genre_name"
    >
      <Genre
        :genre="genre"
        @formGenreCheckedEvent="formGenreChecked"
        @formGenreUncheckedEvent="formGenreUnchecked"
      />
    </div>
  </v-chip-group>
</template>

<script>
export default {
  props: {
    genres: {
      type: Array
    },
    // settingsページ用
    checkedGenres: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formGenreChecked (value) {
      this.$emit('formGenreCheckedEvent', value)
    },
    formGenreUnchecked (value) {
      this.$emit('formGenreUncheckedEvent', value)
    },
    forceUpdate () {
      console.log('forceUpdate')
      this.$forceUpdate()
    }
  }
}
</script>
