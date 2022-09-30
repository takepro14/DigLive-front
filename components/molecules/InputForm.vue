<template>
  <v-container>
    <v-row>
      <v-col class="my-8 text-center">
        <h1 class="text-h5 font-weight-bold">
          {{ appName }}に{{ pageTitle }}
        </h1>
      </v-col>
      <v-card
        outlined
        tile
        class="px-8 py-12"
        width="100%"
      >
        <slot name="user-form-card-content" />
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data ({ $route, $config: { appName }, $my }) {
    return {
      appName,
      pageTitle: $my.pageTitle($route.name)
    }
  }
}
</script>
