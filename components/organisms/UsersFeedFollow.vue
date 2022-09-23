<template>
  <div>
    <v-row v-if="isLoadingFollowedUsers">
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
        v-for="user in followedUsers"
        :key="user.id"
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
  computed: {
    ...mapGetters({
      currentUser: 'modules/user/currentUser',
      followedPage: 'modules/user/followedPage',
      followedUsers: 'modules/user/followedUsers'
    }),
    isLoadingFollowedUsers () {
      return !this.followedUsers.length
    }
  },
  methods: {
    ...mapActions({
      getFollowedPage: 'modules/user/getFollowedPage',
      getFollowedUsers: 'modules/user/getFollowedUsers',
      follow: 'modules/user/follow',
      unfollow: 'modules/user/unfollow'
    }),
    async infiniteHandler ($state) {
      // 初回読み込みで1pageなので2page〜を読み込むためにここでgetPageする
      this.getFollowedPage()
      await this.$axios.$get('/api/v1/users', {
        params: {
          page: this.followedPage,
          user_id: this.currentUser.id
        }
      })
        .then((data) => {
          setTimeout(() => {
            if (this.followedPage <= data.kaminari.pagination.pages) {
              this.getFollowedUsers(data.users)
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
  },
  async mounted () {
    await this.$axios.$get('/api/v1/users', {
      params: {
        page: this.followedPage,
        user_id: this.currentUser.id
      }
    })
      .then((data) => {
        this.getFollowedUsers(data.users)
      })
  }
}
</script>
