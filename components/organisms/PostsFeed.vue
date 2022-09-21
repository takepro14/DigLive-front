<template>
  <div class="mx-auto">
    <PostsFeedNew v-if="newPostsTab" />
    <PostsFeedFollow v-else-if="followedPostsTab" />
    <PostsFeedSearch v-else-if="filteredPostsTab"/>
    <PostCreateDialog
      :genres="genres"
      @createPostEvent="createPost"
    />
  </div>
</template>

<script>
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
    newPostsTab () {
      return (this.menu === 'postsMenu') && (this.tab === 'newTab')
    },
    followedPostsTab () {
      return (this.menu === 'postsMenu') && (this.tab === 'followTab')
    },
    filteredPostsTab () {
      return (this.menu === 'searchMenu') && (this.tab === 'postsTab')
    }
  }
}
</script>
