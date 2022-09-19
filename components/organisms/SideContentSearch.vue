<template>
  <v-list>
    <div class="px-4 py-2">
      <SearchFormKeyword
        :keyword.sync="keyword"
        @formKeywordFocusInEvent="formKeywordFocusIn"
        @formKeywordFocusOutEvent="formKeywordFocusOut"
      />
      <SearchFormGenre
        :genre.sync="genre"
        :genres="genres"
        @formGenreCheckedEvent="formGenreChecked"
        @formGenreUncheckedEvent="formGenreUnchecked"
      />
      <SearchFormTag
        v-if="tab === 'postsTab'"
        :tag.sync="tag"
        :tags="tags"
        @formTagCheckedEvent="formTagChecked"
        @formTagUncheckedEvent="formTagUnchecked"
      />
    </div>
  </v-list>
</template>

<script>
export default {
  layout: 'logged-in',
  middleware: [
    'authentication'
  ],
  props: {
    tab: {
      type: String
    },
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
      genre: ''
    }
  },
  computed: {
    filteredPosts () {
      if (this.keyword !== '') {
        return this.posts.filter((post) => {
          return post.content.includes(this.keyword)
        })
      } else if (this.tag !== '') {
        return this.posts.filter((post) => {
          return post.tags.map(tag => tag.tag_name).includes(this.tag)
        })
      } else if (this.genre !== '') {
        return this.posts.filter((post) => {
          return post.genres.map(genre => genre.genre_name).includes(this.genre)
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
      } else if (this.genre !== '') {
        return this.users.filter((user) => {
          return user.genres.map(genre => genre.genre_name).includes(this.genre)
        })
      } else {
        return []
      }
    }
  },
  methods: {
    formKeywordFocusIn () {
      this.tag = ''
      this.genre = ''
    },
    formKeywordFocusOut () {
      this.keyword = ''
    },
    formTagChecked (value) {
      this.keyword = ''
      this.genre = ''
      this.tag = value
    },
    formTagUnchecked () {
      this.tag = ''
    },
    formGenreChecked (value) {
      this.keyword = ''
      this.tag = ''
      this.genre = value
    },
    formGenreUnchecked () {
      this.genre = ''
    }
  },
  watch: {
    filteredPosts () {
      this.$emit('filteredPostsChangedEvent', this.filteredPosts, this.keyword, this.tag, this.genre)
    },
    filteredUsers () {
      this.$emit('filteredUsersChangedEvent', this.filteredUsers, this.keyword, this.genre)
    }
  }
}
</script>
