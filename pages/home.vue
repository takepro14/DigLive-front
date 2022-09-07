<template>
  <v-container>
    <v-row>
      <!-- 左カラム -->
      <v-col cols="12" sm="12" md="4" lg="4" xl="4">
        <SideMenu
          @menuClickEvent="menuClick"
        />
        <SideContent
          :posts="posts"
          :tags="tags"
          :users="users"
          @filteredPostsChangedEvent="filteredPostsChanged"
          @filteredUsersChangedEvent="filteredUsersChanged"
          class="my-4"
        />
      </v-col>
      <!-- 右カラム -->
      <v-col cols="12" sm="12" md="8" lg="8" xl="8">
        <TabMenu
          @tabClickEvent="tabClick"
        />
        <Loader
          v-if="isLoading === true"
        />
        <PostsFeed
          v-if="menu === 'postsTab'"
          :posts="posts"
          :tab="tab"
          :filteredPosts="filteredPosts"
          :followedUsersPosts="followedUsersPosts"
          :keyword="keyword"
          :tag="tag"
        />
        <UsersFeed
          v-if="menu === 'usersTab'"
          :users="users"
          :tab="tab"
          :filteredUsers="filteredUsers"
          :keyword="keyword"
        />
        <BoardsFeed
          v-if="menu === 'boardsTab'"
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
      menu: 'postsTab',
      tab: 'New',
      filteredPosts: [],
      filteredUsers: [],
      keyword: '',
      tag: ''
    }
  },
  computed: {
    ...mapGetters({
      posts: 'modules/post/posts',
      tags: 'modules/tag/tags',
      users: 'modules/user/users'
    }),
    followedUsersPosts () {
      return this.posts.filter((post) => {
        return post.user.passive_relationships.map(rel => rel.follower_id).includes(this.currentUserId)
      })
    }
  },
  methods: {
    ...mapActions({
      getPosts: 'modules/post/getPosts',
      getTags: 'modules/tag/getTags',
      getUsers: 'modules/user/getUsers'
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
      const [filteredPosts, keyword, tag] = args
      this.filteredPosts = filteredPosts
      this.keyword = keyword
      this.tag = tag
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
  }
}
</script>
