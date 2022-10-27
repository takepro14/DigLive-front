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
    <v-row class="mt-1 mb-8">
      <v-col
        v-for="(user, index) in followedUsersReactive"
        :key="`user-follow-${index}`"
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
          @followEvent="follow"
          @unfollowEvent="unfollow"
        />
      </v-col>
    </v-row>
    <VueInfiniteLoading
      ref="infiniteLoading"
      spinner="spiral"
      @infinite="infiniteHandler"
    >
      <span slot="no-more">----- ユーザは以上です -----</span>
      <span slot="no-results">----- ユーザは以上です -----</span>
    </VueInfiniteLoading>
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
      followedPage: 'modules/user/followedPage',
      followedUsers: 'modules/user/followedUsers'
    }),
    // API GETしたusersの中でリアルタイムにフォロー中のユーザのみ返す
    followedUsersReactive () {
      return this.followedUsers.filter((user) => {
        return user.isFollowed === true
      })
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
      // データの初回ロード前のみスケルトンローダーを表示
      if (!this.followedUsers.length) {
        this.isLoading = true
      }
      await this.$axios.$get('/api/v1/users', {
        params: {
          page: this.followedPage,
          user_id: this.currentUser.id
        }
      })
        .then((data) => {
          setTimeout(() => {
            if (this.followedPage <= data.kaminari.pagination.pages) {
              this.getFollowedPage()
              this.getFollowedUsers(data.users)
              $state.loaded()
              this.isLoading = false
            } else {
              $state.complete()
              this.isLoading = false
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
