<template>
  <v-container>
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
      tag: ''
    }
  },
  computed: {
    ...mapGetters({
      posts: 'modules/post/posts',
      tags: 'modules/tag/tags'
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
    }
  },
  methods: {
    ...mapActions({
      getPosts: 'modules/post/getPosts',
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
    }
  },
  mounted () {
    this.getPosts()
    this.getTags()
  }
}
</script>
