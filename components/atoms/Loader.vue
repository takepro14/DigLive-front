<template>
  <v-sheet
    :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
    class="pa-3"
  >
    <v-skeleton-loader
      v-for="n in 5"
      :key="n.id"
      class="mx-auto my-6"
      min-width="300"
      max-width="600"
      type="card"
    />
  </v-sheet>
</template>

<script>
export default {
  inject: {
    theme: {
      default: { isDark: false }
    }
  }
}
</script>
