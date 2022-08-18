<template>
  <v-toolbar-title>
    <nuxt-link
      :to="homePath"
      class="text-decoration-none"
    >
      {{ appName }}
    </nuxt-link>
  </v-toolbar-title>
</template>

<script>
export default {
  data ({ $config: { appName } }) {
    return {
      homePath: '/',
      appName
    }
  }
}
</script>
