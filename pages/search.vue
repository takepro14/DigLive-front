<template>
  <v-container>
    <v-row>
      <SideMenu
        @menuClickEvent="menuClick"
      />
      <v-container
        v-if="menu === 'postsTab'"
      >
        <SearchFormKeyword
          :keyword.sync="keyword"
          @formKeywordClearEvent="formKeywordClear"
          @formKeywordFocusEvent="formKeywordFocus"
        />
        <SearchFormTag
          :tag.sync="tag"
          :tags="tags"
          @formTagCheckedEvent="formTagChecked"
          @formTagUncheckedEvent="formTagUnchecked"
        />
        <Post
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
        />
      </v-container>
      <v-container
        v-if="menu === 'usersTab'"
      >
        <SearchFormKeyword
          :keyword.sync="keyword"
          @formKeywordClearEvent="formKeywordClear"
          @formKeywordFocusEvent="formKeywordFocus"
        />
        <User
          v-for="user in filteredUsers"
          :key="user.id"
          :user="user"
        />
      </v-container>

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
      keyword: '',
      tag: '',
      menu: 'postsTab'
    }
  },
  computed: {
    ...mapGetters({
      posts: 'modules/post/posts',
      tags: 'modules/tag/tags',
      users: 'modules/user/users'
    }),
    filteredPosts () {
      if (this.keyword !== '') {
        return this.posts.filter((post) => {
          return post.content.includes(this.keyword)
        })
      } else if (this.tags !== '') {
        return this.posts.filter((post) => {
          return post.tags.map(tag => tag.tag_name).includes(this.tag)
        })
      } else {
        return []
      }
    },
    filteredUsers () {
      if (this.keyword !== '') {
        return this.users.filter((user) => {
          return user.name.includes(this.keyword)
        })
      } else {
        return []
      }
    }
  },
  methods: {
    ...mapActions({
      getPosts: 'modules/post/getPosts',
      getUsers: 'modules/post/getUsers',
      getTags: 'modules/tag/getTags'
    }),
    formKeywordClear () {
      this.keyword = ''
    },
    formTagClear () {
      this.tag = ''
    },
    formKeywordFocus () {
      this.formTagClear()
    },
    formTagChecked (value) {
      this.tag = value
      this.formKeywordClear()
    },
    formTagUnchecked () {
      this.tag = ''
    },
    menuClick (value) {
      this.menu = value
    }
  },
  mounted () {
    this.getPosts()
    this.getUsers()
    this.getTags()
  }
}
</script>
