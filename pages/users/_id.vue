<template>
  <v-container class="pb-16">
    <Toaster />
    <HistoryBack class="pb-4" />
    <v-row>
      <v-col>
        <User
          :user="user"
          :currentUser="currentUser"
          @followEvent="follow"
          @unfollowEvent="unfollow"
          :genres="genres"
        />
      </v-col>
    </v-row>
    <v-row class="pb-16">
      <v-col>
        <UserTab
          :tabs="tabs"
          :userName="user.name"
          @tabClickEvent="tabClick"
        />
        <div v-if="userPostsTab">
          <UserPosts
            :user="user"
            :currentUser="currentUser"
          />
        </div>
        <div v-if="userLikesTab">
          <UserLikes
            :user="user"
            :currentUser="currentUser"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'logged-in',
  data () {
    return {
      tab: 'postsTab',
      tabs: [
        { title: '投稿', name: 'postsTab' },
        { title: 'いいね', name: 'likesTab' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'modules/user/user',
      currentUser: 'modules/user/currentUser',
      genres: 'modules/genre/genres'
    }),
    userPostsTab () {
      return this.tab === 'postsTab'
    },
    userLikesTab () {
      return this.tab === 'likesTab'
    }
  },
  methods: {
    ...mapActions({
      getCurrentUser: 'modules/user/getCurrentUser',
      getGenres: 'modules/genre/getGenres',
      getUserClear: 'modules/user/getUserClear',
      getUserPostsClear: 'modules/post/getUserPostsClear',
      follow: 'modules/user/follow',
      unfollow: 'modules/user/unfollow',
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost'
    }),
    tabClick (tabName) {
      this.tab = tabName
    }
  },
  async fetch ({ $axios, params, store }) {
    await $axios.$get(`/api/v1/users/${params.id}`)
      .then((user) => {
        store.dispatch('modules/user/getUser', user)
      })
  },
  created () {
    this.getCurrentUser()
    this.getGenres()
  },
  // id.vue => id.vueに移動する時にdestroyed hookに定義するとエラーになるため
  beforeDestroyed () {
    this.getUserClear(this.user_id)
  },
  destroyed () {
    this.getUserPostsClear()
  }
}
</script>
