<template>
  <div>
    <v-bottom-navigation
      bottom
      fixed
    >
      <!--------------------------------------------------
        マイページ
      --------------------------------------------------->
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
      <!--------------------------------------------------
        ホーム
      --------------------------------------------------->
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
      <!--------------------------------------------------
        通知
      --------------------------------------------------->
      <v-spacer />
      <nuxt-link
        to="/notification"
        class="text-decoration-none d-flex align-center"
      >
        <v-btn
          color="button"
          text
        >
          <v-icon>
            mdi-bell
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
