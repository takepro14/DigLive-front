<template>
  <div>
    <v-bottom-navigation
      bottom
      fixed
    >
      <v-spacer />
      <nuxt-link
        :to="currentUserPath"
        class="text-decoration-none d-flex align-center"
      >
        <v-btn
          color="button"
          text
        >
          <v-icon>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </nuxt-link>
      <v-spacer />
      <nuxt-link
        to="/home"
        class="text-decoration-none d-flex align-center"
      >
        <v-btn
          color="button"
          text
        >
          <v-icon>
            mdi-home
          </v-icon>
        </v-btn>
      </nuxt-link>
      <v-spacer />
      <nuxt-link
        to="/notification"
        class="text-decoration-none d-flex align-center"
      >
        <v-btn
          color="button"
          text
        >
            <v-badge
              v-if="notificationsUncheckedCount"
              overlap
              offset-x="-2"
              offset-y="-10"
              color="green"
              :content="notificationsUncheckedCount"
            />
          <v-icon>
            mdi-bell
          </v-icon>
        </v-btn>
      </nuxt-link>
      <v-spacer />
    </v-bottom-navigation>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    scrollTarget: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'modules/user/currentUser',
      notificationsUncheckedCount: 'notificationsUncheckedCount'
    }),
    currentUserPath () {
      return '/users/' + this.currentUser.id
    }
  }
}
</script>
