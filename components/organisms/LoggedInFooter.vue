<template>
  <div>
    <v-bottom-navigation
      bottom
      fixed
    >
      <!----- Home ----->
      <v-spacer />
      <nuxt-link
        to="/posts"
        class="text-decoration-none d-flex align-center"
      >
        <v-btn
          color="deep-purple accent-4"
          text
        >
          <v-icon>
            mdi-home
          </v-icon>
        </v-btn>
      </nuxt-link>
      <!----- Search ----->
      <v-spacer />
      <nuxt-link
        to="/search"
        class="text-decoration-none d-flex align-center"
      >
        <v-btn
          color="deep-purple accent-4"
          text
        >
          <v-icon>
            mdi-magnify
          </v-icon>
        </v-btn>
      </nuxt-link>
      <!----- Notice ----->
      <v-spacer />
      <nuxt-link
        to="#"
        class="text-decoration-none d-flex align-center"
      >
        <v-btn
          color="deep-purple accent-4"
          text
        >
          <v-icon>
            mdi-bell
          </v-icon>
        </v-btn>
      </nuxt-link>
      <!----- Mail ----->
      <v-spacer />
      <nuxt-link
        to="#"
        class="text-decoration-none d-flex align-center"
      >
        <v-btn
          color="deep-purple accent-4"
          text
        >
          <v-icon>
            mdi-email
          </v-icon>
        </v-btn>
      </nuxt-link>
      <v-spacer />
    </v-bottom-navigation>
    <v-responsive
      id="hide-on-scroll-example"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-responsive
        height="1500"
      />
    </v-responsive>
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
