<template>
  <v-container
    fluid
  >
    <Toaster />
    <v-row>
      <v-col>
        <NotLoggedInHeader />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0">
        <NotLoggedInHome />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
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
