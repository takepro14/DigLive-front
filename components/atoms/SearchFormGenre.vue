<template>
  <div>
    <v-chip-group
      column
    >
      <v-card-text>
        <h2
          class="text-h6 text-center font-weight-bold"
        >
          音楽ジャンルで検索
        </h2>
      </v-card-text>
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
    },
    genre: {
      type: String
    }
  },
  computed: {
    setGenre: {
      get () { return this.genre },
      set (newVal) { return this.$emit('update:genre', newVal) }
    }
  },
  methods: {
    formGenreChecked (value) {
      this.$emit('formGenreCheckedEvent', value)
    },
    formGenreUnchecked () {
      this.$emit('formGenreUncheckedEvent')
    }
  }
}
</script>
