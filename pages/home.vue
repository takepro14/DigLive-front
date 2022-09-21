<template>
  <v-container
    fluid
    class="pa-8"
  >
    <Toaster />
    <v-row>
      <v-col cols="12" sm="12" md="4" lg="4" xl="4">
        <!-- <div v-if="isLoading">
          <LoaderTypeCard :repeat="1" />
          <LoaderTypeTag :repeat="2" />
        </div>
        <div v-else> -->
          <SideMenu
            :menus="menus"
            @menuClickEvent="menuClick"
          />
          <div v-if="menu === ('postsMenu' || 'usersMenu')" >
            <SideContentMain />
          </div>
          <div v-else-if="menu === 'searchMenu'" >
            <SideContentSearch
              class="my-4"
              :tab="tab"
              :users="users"
              :genres="genres"
              :tags="tags"
              @filteredPostsChangedEvent="filteredPostsChanged"
              @filteredUsersChangedEvent="filteredUsersChanged"
            />
          </div>
        <!-- </div> -->
      </v-col>
      <v-col cols="12" sm="12" md="8" lg="8" xl="8">
        <!-- <div v-if="isLoading">
          <LoaderTypeCard :repeat="5" />
        </div>
        <div v-else > -->
          <TabMenu
            :menu="menu"
            :mainTabs="mainTabs"
            :searchTabs="searchTabs"
            @tabClickEvent="tabClick"
          />
          <PostsFeed
            :menu="menu"
            :tab="tab"
            :genres="genres"
            :tags="tags"
            :filteredPosts="filteredPosts"
            :keyword="keyword"
            :genre="genre"
            :tag="tag"
          />
          <UsersFeed
            :menu="menu"
            :tab="tab"
            :users="users"
            :genres="genres"
            :currentUser="currentUser"
            :followedUsers="followedUsers"
            :filteredUsers="filteredUsers"
            :keyword="keyword"
            :genre="genre"
          />
        <!-- </div> -->
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
      menu: 'postsMenu',
      tab: 'newTab',
      filteredPosts: [],
      filteredUsers: [],
      keyword: '',
      tag: '',
      genre: '',
      menus: [
        { title: '投稿', name: 'postsMenu', icon: 'mdi-comment-processing' },
        { title: 'ユーザー', name: 'usersMenu', icon: 'mdi-account-multiple' },
        { title: '検索', name: 'searchMenu', icon: 'mdi-magnify' }
      ],
      mainTabs: [
        { title: '最新', name: 'newTab' },
        { title: 'フォロー', name: 'followTab' }
      ],
      searchTabs: [
        { title: '投稿', name: 'postsTab' },
        { title: 'ユーザー', name: 'usersTab' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      // posts: 'modules/post/posts',
      // users: 'modules/user/users',
      genres: 'modules/genre/genres',
      tags: 'modules/tag/tags',
      currentUser: 'modules/user/currentUser'
    })
    // followedUsers () {
    //   return this.users.filter((user) => {
    //     return this.currentUser.active_relationships.map(rel => rel.followed_id).includes(user.id)
    //   })
    // }
  },
  methods: {
    ...mapActions({
      getTags: 'modules/tag/getTags',
      getGenres: 'modules/genre/getGenres',
      getUsers: 'modules/user/getUsers',
      getCurrentUser: 'modules/user/getCurrentUser'
    }),
    menuClick (value) {
      this.menu = value
      // メニューによってv-tabsが異なるため補正の処理
      if (this.menu === 'postsMenu' || this.menu === 'usersMenu') {
        if (this.tab === 'postsTab') {
          this.tab = 'newTab'
        } else if (this.tab === 'usersTab') {
          this.tab = 'followTab'
        }
      } else if (this.menu === 'searchMenu') {
        if (this.tab === 'newTab') {
          this.tab = 'postsTab'
        } else if (this.tab === 'followTab') {
          this.tab = 'usersTab'
        }
      }
    },
    tabClick (value) {
      this.tab = value
    },
    stopLoading () {
      this.isLoading = false
    },
    filteredPostsChanged (...args) {
      const [filteredPosts, keyword, tag, genre] = args
      this.filteredPosts = filteredPosts
      this.keyword = keyword
      this.tag = tag
      this.genre = genre
    },
    filteredUsersChanged (...args) {
      const [filteredUsers, keyword, genre] = args
      this.filteredUsers = filteredUsers
      this.keyword = keyword
      this.genre = genre
    }
  }
  // PostFeed.vue, SideContent.vueとやりとりするのでhome.vueでGET
  // async fetch () {
  //   await this.getPosts()
  // }
  // .then(() => {
  // await this.getGenres()
  // })
  //     .then(() => {
  //       this.getTags()
  //     })
  //     .then(() => {
  //       this.getUsers()
  //     })
  //     .then(() => {
  //       this.getCurrentUser()
  //     })
  //     .then(() => {
  //       this.stopLoading()
  //     })
  // }
}
</script>
