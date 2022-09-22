<template>
  <v-list>
    <div class="px-4 py-2">
      <SearchFormKeyword
        :keyword.sync="keyword"
        @formKeywordFocusInEvent="formKeywordFocusIn"
      />
      <SearchFormGenre
        :genre.sync="genre"
        :genres="genres"
        @formGenreCheckedEvent="formGenreChecked"
        @formGenreUncheckedEvent="formGenreUnchecked"
      />
      <SearchFormTag
        v-if="isPostsTab"
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
    isPostsTab () {
      return this.tab === 'postsTab'
    }
  },
  methods: {
    formKeywordFocusIn () {
      this.tag = ''
      this.genre = ''
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
    keyword () {
      this.$emit('keywordChangedEvent', this.keyword)
    },
    genre () {
      this.$emit('genreChangedEvent', this.genre)
    },
    tag () {
      this.$emit('tagChangedEvent', this.tag)
    }
  }
}
</script>
