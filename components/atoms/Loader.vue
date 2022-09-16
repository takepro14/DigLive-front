<template>
  <v-sheet
    color="loader"
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
