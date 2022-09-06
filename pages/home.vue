<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="4" lg="4" xl="4">
        <SideMenu
          @menuClickEvent="menuClick"
        />
        <SideContent
          :posts="posts"
          :tags="tags"
          @filteredPostsChangedEvent="filteredPostsChanged"
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
          v-if="menu === 'postsTab'"
          :tab="tab"
          :posts="posts"
          :filteredPosts="filteredPosts"
          :keyword="keyword"
          :tag="tag"
        />
        <UsersFeed
          v-if="menu === 'usersTab'"
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
  data () {
    return {
      isLoading: true,
      menu: 'postsTab',
      tab: 'New',
      filteredPosts: [],
      keyword: '',
      tag: ''
    }
  },
  computed: {
    ...mapGetters({
      posts: 'modules/post/posts',
      tags: 'modules/tag/tags'
    })
  },
  methods: {
    ...mapActions({
      getPosts: 'modules/post/getPosts',
      getTags: 'modules/tag/getTags'
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
    filteredPostsChanged (...args) {
      const [filteredPosts, keyword, tag] = args
      this.filteredPosts = filteredPosts
      this.keyword = keyword
      this.tag = tag
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
  }
}
</script>
