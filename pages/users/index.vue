<template>
  <v-container>
    <User
      v-for="user in users"
      :key="user.id"
      :user="user"
    />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'logged-in',
  // data ({ $route }) {
  //   return {
  //     post_id: $route.params.id
  //   }
  // },
  computed: {
    ...mapGetters({
      users: 'modules/user/users'
    })
  },
  // methods: {
  //   emitEvent (value) {
  //     this.$store.dispatch('modules/post/reloadComment', value)
  //   }
  // },
  async fetch ({ $axios, store }) {
    await $axios.$get('/api/v1/users')
      .then((users) => {
        store.dispatch('modules/user/setUsers', users)
      })
  }
}
</script>
