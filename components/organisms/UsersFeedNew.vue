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
        v-for="(user,index) in signedUpUsers"
        :key="`user-new-${index}`"
        cols="12"
        sm="12"
        md="12"
        lg="6"
        xl="4"
      >
        <User
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
      page: 'modules/user/page',
      users: 'modules/user/users'
    }),
    // ユーザ一覧(最新)ではゲスト以外のみ表示する(ビューが汚れる為)
    signedUpUsers () {
      return this.users.filter((user) => {
        return user.name !== 'ゲストユーザー'
      })
    }
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
