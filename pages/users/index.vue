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
import { mapGetters, mapActions } from 'vuex'
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
  methods: {
    ...mapActions({
      getUsers: 'modules/user/getUsers'
    })
  },
  async fetch () {
    await this.getUsers()
  }
}
</script>
