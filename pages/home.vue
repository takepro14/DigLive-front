<template>
  <v-container
    fluid
    class="pa-8"
  >
    <Toaster />
    <v-row>
      <v-col cols="12" sm="12" md="4" lg="4" xl="4">
        <SideMenu
          :menus="menus"
          @menuClickEvent="menuClick"
        />
        <SideContentMain
          v-if="menu === ('postsMenu' || 'usersMenu')"
        />
        <SideContentSearch
          v-else-if="menu === 'searchMenu'"
          class="my-4"
          :tab="tab"
          :genres="genres"
          :tags="tags"
          @keywordChangedEvent="keywordChanged"
          @genreChangedEvent="genreChanged"
          @tagChangedEvent="tagChanged"
        />
      </v-col>
      <v-col cols="12" sm="12" md="8" lg="8" xl="8">
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
          :keyword="keyword"
          :genre="genre"
          :tag="tag"
        />
        <UsersFeed
          :menu="menu"
          :tab="tab"
          :genres="genres"
          :keyword="keyword"
          :genre="genre"
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
      genres: 'modules/genre/genres',
      tags: 'modules/tag/tags'
    })
  },
  methods: {
    ...mapActions({
      getTags: 'modules/tag/getTags',
      getGenres: 'modules/genre/getGenres'
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
    keywordChanged (value) {
      this.keyword = value
    },
    genreChanged (value) {
      this.genre = value
    },
    tagChanged (value) {
      this.tag = value
    }
  },
  async fetch () {
    await this.getGenres()
    await this.getTags()
    await this.stopLoading()
  }
}
</script>
