<template>
  <div>
    <!-- ヘッダー部 -->
    <v-toolbar
      color="header"
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
    <!-- データ部 -->
    <v-list>
      <div
        class="px-4 py-2"
      >
        <!--------------------------------------------------
          投稿メニュー選択時
        --------------------------------------------------->
        <div v-if="menu === 'postsMenu'">
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
            :tag.sync="tag"
            :tags="tags"
            @formTagCheckedEvent="formTagChecked"
            @formTagUncheckedEvent="formTagUnchecked"
          />
        </div>
        <!--------------------------------------------------
          ユーザメニュー選択時
        --------------------------------------------------->
        <div
          v-if="menu === 'usersMenu'"
        >
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
        </div>
      </div>
    </v-list>
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
    },
    menu: {
      type: String
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
