<template>
  <div>
    <v-card
      class="overflow-hidden mx-auto"
      height="200"
    >
      <v-bottom-navigation
        absolute
        hide-on-scroll
        horizontal
        scroll-target=scrollTarget
      >
        <v-spacer />
        <v-btn
          color="deep-purple accent-4"
          text
        >
          <span>Recents</span>
          <v-icon>mdi-history</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn
          color="deep-purple accent-4"
          text
        >
          <span>Favorites</span>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn
          color="deep-purple accent-4"
          text
        >
          <span>Nearby</span>
          <v-icon>mdi-map-marker</v-icon>
        </v-btn>
        <v-spacer />
      </v-bottom-navigation>
      <v-responsive
        id="hide-on-scroll-example"
        class="overflow-y-auto"
        max-height="600"
      >
        <v-responsive height="1500"></v-responsive>
      </v-responsive>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    scrollTarget: {
      type: String,
      default: ''
    }
  }
}
</script>
