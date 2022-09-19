<template>
  <v-container class="my-16">
    <v-row>
      <v-col>
        <NotLoggedInHeader />
        <NotLoggedInHome />
        <NotLoggedInFooter />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'not-logged-in',
  data: () => ({
    drawer: null
  })
}
</script>
