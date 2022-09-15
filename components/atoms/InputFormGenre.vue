<template>
  <div>
    <v-chip-group
      column
      multiple
      class="my-4"
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
  </div>
</template>

<script>
export default {
  props: {
    genres: {
      type: Array
    },
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
    }
  }
}
</script>
