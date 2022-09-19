<template>
  <v-container>
    <HistoryBack
      class="py-4"
    />
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
        <v-toolbar
          color="header"
          dark
          flat
        >
          <v-toolbar-title class="mx-auto">
            {{ user.name }} さんの活動
          </v-toolbar-title>
          <template #extension>
            <v-tabs
              centered
              slider-color="slider"
              grow
            >
              <v-tab
                v-for="tab in tabs"
                :key="tab.id"
                @click="tabClick(tab.name)"
              >
                {{ tab.title }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <div v-if="menu === 'postsTab'">
          <Post
            v-for="post in userPosts"
            :key="post.id"
            :post="post"
            @likePostEvent="likePost"
            @unLikePostEvent="unLikePost"
          />
        </div>
        <div v-if="menu === 'likesTab'">
          <Post
            v-for="post in likedPosts"
            :key="post.id"
            :post="post"
            @likePostEvent="likePost"
            @unLikePostEvent="unLikePost"
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
      menu: 'postsTab',
      tabs: [
        {
          title: '投稿',
          name: 'postsTab'
        },
        {
          title: 'いいね',
          name: 'likesTab'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'modules/user/user',
      posts: 'modules/post/posts',
      currentUser: 'modules/user/currentUser',
      genres: 'modules/genre/genres'
    }),
    userPosts () {
      return this.posts.filter((post) => {
        return post.user.id === this.user.id
      })
    },
    likedPosts () {
      return this.posts.filter((post) => {
        return post.likes.map((like) => { return like.id }).includes(this.user.id)
      })
    }
  },
  methods: {
    ...mapActions({
      emitSetUserClear: 'modules/user/emitSetUserClear',
      follow: 'modules/user/follow',
      unfollow: 'modules/user/unfollow',
      changeProfile: 'modules/user/changeProfile',
      getGenres: 'modules/genre/getGenres',
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost'
    }),
    tabClick (tabName) {
      this.menu = tabName
    }
  },
  async fetch ({ $axios, params, store }) {
    await $axios.$get(`/api/v1/users/${params.id}`)
      .then((user) => {
        store.dispatch('modules/user/emitSetUser', user)
        return user
      })
      .then(() => {
        store.dispatch('modules/user/getCurrentUser')
      })
      .then(() => {
        store.dispatch('modules/post/getPosts')
      })
  },
  created () {
    this.getGenres()
  },
  destroyed () {
    this.emitSetUserClear(this.user_id)
  }
}
</script>
