<template>
  <v-container>
    <Toaster />
    <v-row>
      <v-col cols="12" sm="12" md="4" lg="4" xl="4">
        <SideMenu
          @menuClickEvent="menuClick"
        />
        <SideContent
          :posts="posts"
          :users="users"
          :genres="genres"
          :tags="tags"
          :menu="menu"
          @filteredPostsChangedEvent="filteredPostsChanged"
          @filteredUsersChangedEvent="filteredUsersChanged"
          class="my-4"
        />
      </v-col>
      <v-col cols="12" sm="12" md="8" lg="8" xl="8">
        <TabMenu
          @tabClickEvent="tabClick"
        />
        <Loader
          v-if="isLoading === true"
        />
        <PostsFeed
          v-if="menu === 'postsMenu'"
          :posts="posts"
          :tab="tab"
          :filteredPosts="filteredPosts"
          :followedUsersPosts="followedUsersPosts"
          :keyword="keyword"
          :tag="tag"
          :genres="genres"
          :tags="tags"
          :genre="genre"
        />
        <UsersFeed
          v-if="menu === 'usersMenu'"
          :users="users"
          :currentUser="currentUser"
          :tab="tab"
          :filteredUsers="filteredUsers"
          :followedUsers="followedUsers"
          :keyword="keyword"
        />
        <BoardsFeed
          v-if="menu === 'boardsMenu'"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'logged-in',
  middleware: [
    'authentication'
  ],
  data ({ $store }) {
    return {
      currentUserId: $store.state.user.current.id,
      isLoading: true,
      isLoadingUsers: true,
      menu: 'postsMenu',
      tab: 'New',
      filteredPosts: [],
      filteredUsers: [],
      keyword: '',
      tag: '',
      genre: ''
    }
  },
  computed: {
    ...mapGetters({
      posts: 'modules/post/posts',
      users: 'modules/user/users',
      genres: 'modules/genre/genres',
      tags: 'modules/tag/tags',
      currentUser: 'modules/user/currentUser'
    }),
    followedUsersPosts () {
      return this.posts.filter((post) => {
        return post.user.passive_relationships.map(rel => rel.follower_id).includes(this.currentUserId)
      })
    },
    followedUsers () {
      return this.users.filter((user) => {
        return this.currentUser.active_relationships.map(rel => rel.followed_id).includes(user.id)
      })
    }
  },
  methods: {
    ...mapActions({
      getPosts: 'modules/post/getPosts',
      getTags: 'modules/tag/getTags',
      getGenres: 'modules/genre/getGenres',
      getUsers: 'modules/user/getUsers',
      getCurrentUser: 'modules/user/getCurrentUser'
    }),
    menuClick (value) {
      this.menu = value
    },
    tabClick (value) {
      this.tab = value
    },
    stopLoading () {
      this.isLoading = false
    },
    stopLoadingUsers () {
      this.isLoadingUsers = false
    },
    filteredPostsChanged (...args) {
      const [filteredPosts, keyword, tag, genre] = args
      this.filteredPosts = filteredPosts
      this.keyword = keyword
      this.tag = tag
      this.genre = genre
    },
    filteredUsersChanged (...args) {
      const [filteredUsers, keyword] = args
      this.filteredUsers = filteredUsers
      this.keyword = keyword
    }
  },
  // PostFeed.vue, SideContent.vueとやりとりするのでhome.vueでGET
  async fetch () {
    await this.getPosts()
      .then(() => {
        this.getGenres()
      })
      .then(() => {
        this.getTags()
      })
      .then(() => {
        this.stopLoading()
      })
      .then(() => {
        this.getUsers()
      })
      .then(() => {
        this.stopLoadingUsers()
      })
      .then(() => {
        this.getCurrentUser()
      })
  }
}
</script>
