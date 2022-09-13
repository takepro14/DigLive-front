<template>
  <div>
    <v-chip
      link
      filter
      label
      @click="toggleGenre"
      color="purple lighten-5"
      :input-value="inputValue"
    >
    {{ genre.genre_name }}
    </v-chip>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isChecked: false
    }
  },
  props: {
    genre: {
      type: Object
    }
  },
  methods: {
    toggleGenre () {
      this.isChecked = !this.isChecked
      if (this.isChecked === true) {
        this.$emit('formGenreCheckedEvent', this.genre.genre_name)
      } else {
        this.$emit('formGenreUncheckedEvent', this.genre.genre_name)
      }
    }
  }
}
</script>
