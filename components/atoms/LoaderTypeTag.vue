<template>
  <v-sheet
    color="loader"
    class="my-2"
  >
    <div
      v-for="n in repeat"
      :key="n.id"
    >
      <v-skeleton-loader
        type="card-heading"
      />
      <div
        class="pa-3 d-flex flex-wrap"
      >
        <div
          v-for="n in 20"
          :key="n.id"
        >
          <v-skeleton-loader
            class="mx-1 my-1"
            width="100%"
            type="chip"
          />
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default ({
  props: {
    repeat: {
      type: Number
    }
  }
})
</script>
