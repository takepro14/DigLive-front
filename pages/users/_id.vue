<template>
  <v-container>
    <HistoryBack class="py-4" />
    <v-row>
      <v-col>
        <User
          :user="user"
          :currentUser="currentUser"
          @followEvent="follow"
          @unfollowEvent="unfollow"
          @changeProfileEvent="changeProfile"
          :genres="genres"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <UserTab
          :tabs="tabs"
          :userName="user.name"
          @tabClickEvent="tabClick"
        />
        <div v-if="userPostsTab">
          <UserPosts />
        </div>
        <div v-if="userLikesTab">
          <UserLikes />
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
      currentUser: 'modules/user/currentUser',
      user: 'modules/user/user',
      posts: 'modules/post/posts',
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
      getUserClear: 'modules/user/getUserClear',
      getUserPostsClear: 'modules/post/getUserPostsClear',
      follow: 'modules/user/follow',
      unfollow: 'modules/user/unfollow',
      changeProfile: 'modules/user/changeProfile',
      getGenres: 'modules/genre/getGenres',
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
  destroyed () {
    this.getUserClear(this.user_id)
    this.getUserPostsClear()
  }
}
</script>
