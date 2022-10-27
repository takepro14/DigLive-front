<template>
  <v-card class="pa-4">
    <SearchFormKeyword
      class="pt-2"
      :keyword.sync="keyword"
      @formKeywordFocusInEvent="formKeywordFocusIn"
    />
    <SearchFormGenre
      class="pt-2"
      :genre.sync="genre"
      :genres="genres"
      @formGenreCheckedEvent="formGenreChecked"
      @formGenreUncheckedEvent="formGenreUnchecked"
    />
    <SearchFormTag
      v-if="isPostsTab"
      class="pt-2"
      :tag.sync="tag"
      :tags="tags"
      @formTagCheckedEvent="formTagChecked"
      @formTagUncheckedEvent="formTagUnchecked"
    />
  </v-card>
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
