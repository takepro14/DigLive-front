<template>
  <div>
    <v-bottom-navigation
      bottom
      fixed
    >
      <!----- Home ----->
      <v-spacer />
      <nuxt-link
        to="/home"
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
      <!-- --- Search ----->
      <v-spacer />
      <nuxt-link
        :to="currentUserPath"
        class="text-decoration-none d-flex align-center"
      >
        <v-btn
          color="deep-purple accent-4"
          text
        >
          <v-icon>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </nuxt-link>
      <!----- Notification ----->
      <v-spacer />
      <nuxt-link
        to="/notification"
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
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    scrollTarget: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'modules/user/currentUser'
    }),
    currentUserPath () {
      return '/users/' + this.currentUser.id
    }
  },
  methods: {
    ...mapActions({
      getCurrentUser: 'modules/user/getCurrentUser'
    })
  },
  async fetch () {
    await this.getCurrentUser()
  }
}
</script>
