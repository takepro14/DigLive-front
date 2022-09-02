<template>
  <div
    class="mx-auto"
  >
    <User
      v-for="user in users"
      :key="user.id"
      :user="user"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
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
