<template>
  <div>
    <v-chip
      link
      filter
      label
      color="genre"
      @click="toggleGenre"
    >
      <!-- :input-value="selected" -->
      {{ genre.genre_name }}
    </v-chip>
  </div>
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
      if (this.isChecked === true) {
        this.$emit('formGenreCheckedEvent', this.genre.genre_name)
      } else {
        this.$emit('formGenreUncheckedEvent', this.genre.genre_name)
      }
    }
  }
}
</script>
