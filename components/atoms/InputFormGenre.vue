<template>
  <div>
    <v-chip-group
      column
      multiple
      class="my-4"
    >
      <Genre
        v-for="genre in genres"
        :key="genre.genre_name"
        :genre="genre"
        @formGenreCheckedEvent="formGenreChecked"
        @formGenreUncheckedEvent="formGenreUnchecked"
      />
    </v-chip-group>
  </div>
</template>

<script>
export default {
  props: {
    genres: {
      type: Array
    }
  },
  data () {
    return {
      checkedGenres: []
    }
  },
  methods: {
    formGenreChecked (value) {
      this.checkedGenres.push(value)
    },
    formGenreUnchecked (value) {
      const index = this.checkedGenres.indexOf(value)
      this.checkedGenres.splice(index, 1)
    }
  },
  watch: {
    checkedGenres (newValue) {
      this.$emit('checkedGenresEvent', newValue)
    }
  }
}
</script>
