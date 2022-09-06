<template>
  <v-container>
    <v-row>
      <!-- 投稿タブ時の検索フォーム -->
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
      </v-container>
      <!-- ユーザータブ時の検索フォーム -->
      <v-container
        v-if="menu === 'usersTab'"
      >
        <SearchFormKeyword
          :keyword.sync="keyword"
          @formKeywordClearEvent="formKeywordClear"
          @formKeywordFocusEvent="formKeywordFocus"
        />
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'logged-in',
  middleware: [
    'authentication'
  ],
  props: {
    posts: {
      type: Array
    },
    tags: {
      type: Array
    },
    users: {
      type: Array
    }
  },
  data () {
    return {
      keyword: '',
      tag: '',
      menu: 'postsTab'
    }
  },
  computed: {
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
          return (user.name.includes(this.keyword) || user.profile.includes(this.keyword))
        })
      } else {
        return []
      }
    }
  },
  methods: {
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
  watch: {
    filteredPosts () {
      this.$emit('filteredPostsChangedEvent', this.filteredPosts, this.keyword, this.tag)
    },
    filteredUsers () {
      this.$emit('filteredUsersChangedEvent', this.filteredUsers, this.keyword)
    }
  }
}
</script>
