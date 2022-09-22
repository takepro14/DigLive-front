<template>
  <div class="mx-auto">
    <PostsFeedNew
      v-if="newPostsTab"
    />
    <PostsFeedFollow
      v-else-if="followedPostsTab"
    />
    <PostsFeedSearch
      v-else-if="filteredPostsTab"
      :keyword="keyword"
      :genre="genre"
      :tag="tag"
    />
    <PostCreateDialog
      :genres="genres"
      :tags="tags"
      @createPostEvent="createPost"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    menu: {
      type: String
    },
    tab: {
      type: String
    },
    genres: {
      type: Array
    },
    tags: {
      type: Array
    },
    keyword: {
      type: String
    },
    genre: {
      type: String
    },
    tag: {
      type: String
    }
  },
  computed: {
    ...mapGetters({
      posts: 'modules/post/posts',
      followedPosts: 'modules/post/followedPosts'
    }),
    newPostsTab () {
      return (this.menu === 'postsMenu') && (this.tab === 'newTab')
    },
    followedPostsTab () {
      return (this.menu === 'postsMenu') && (this.tab === 'followTab')
    },
    filteredPostsTab () {
      return (this.menu === 'searchMenu') && (this.tab === 'postsTab')
    }
  },
  methods: {
    ...mapActions({
      createPost: 'modules/post/createPost'
    })
  }
}
</script>
