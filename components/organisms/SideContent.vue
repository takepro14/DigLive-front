<template>
  <div>
    <v-card
      v-if="menu === 'postsTab'"
    >
      <v-toolbar
        color="subheader"
        dark
        flat
      >
        <v-toolbar-title>
          <v-icon class="mr-3">
            mdi-magnify
          </v-icon>
          検索
        </v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-card>
          <SearchFormKeyword
            :keyword.sync="keyword"
            @formKeywordClearEvent="formKeywordClear"
            @formKeywordFocusEvent="formKeywordFocus"
          />
          <SearchFormGenre
            :genre.sync="genre"
            :genres="genres"
            @formGenreCheckedEvent="formGenreChecked"
            @formGenreUncheckedEvent="formGenreUnchecked"
          />
          <SearchFormTag
            :tag.sync="tag"
            :tags="tags"
            @formTagCheckedEvent="formTagChecked"
            @formTagUncheckedEvent="formTagUnchecked"
          />
        </v-card>
      </v-list>
    </v-card>
    <v-card
      v-if="menu === 'usersTab'"
    >
      <SearchFormKeyword
        :keyword.sync="keyword"
        @formKeywordClearEvent="formKeywordClear"
        @formKeywordFocusEvent="formKeywordFocus"
      />
    </v-card>
  </div>
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
    users: {
      type: Array
    },
    genres: {
      type: Array
    },
    tags: {
      type: Array
    }
  },
  data () {
    return {
      keyword: '',
      tag: '',
      genre: '',
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
