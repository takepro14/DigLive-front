<template>
  <div>
    <v-row v-if="isLoading">
      <v-col
        v-for="n in 10"
        :key="n"
        cols="12"
        sm="12"
        md="12"
        lg="6"
        xl="4"
      >
        <LoaderTypeCard />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(user,index) in users"
        :key="`user-new-${index}`"
        cols="12"
        sm="12"
        md="12"
        lg="6"
        xl="4"
      >
        <User
          v-if="user.id !== currentUser.id"
          :user="user"
          :currentUser="currentUser"
          class="my-6"
          @followEvent="follow"
          @unfollowEvent="unfollow"
        />
      </v-col>
    </v-row>
    <VueInfiniteLoading
      ref="infiniteLoading"
      spinner="spiral"
      @infinite="infiniteHandler"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'modules/user/currentUser',
      page: 'modules/user/page',
      users: 'modules/user/users'
    })
  },
  methods: {
    ...mapActions({
      getPage: 'modules/user/getPage',
      getUsers: 'modules/user/getUsers',
      follow: 'modules/user/follow',
      unfollow: 'modules/user/unfollow'
    }),
    async infiniteHandler ($state) {
      if (!this.users.length) {
        this.isLoading = true
      }
      await this.$axios.$get('/api/v1/users', {
        params: {
          page: this.page
        }
      })
        .then((data) => {
          setTimeout(() => {
            if (this.page <= data.kaminari.pagination.pages) {
              this.getPage()
              this.getUsers(data.users)
              this.isLoading = false
              $state.loaded()
            } else {
              $state.complete()
            }
          }, 1000)
        })
        .catch(() => {
          $state.complete()
        })
    }
  }
}
</script>
