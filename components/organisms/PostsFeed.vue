<template>
  <div class="mx-auto">
    <div v-if="newPostsTab">
      <LoaderTypeCard v-if="isLoadingPosts" />
      <PostsFeedNew />
    </div>
    <div v-else-if="followedPostsTab">
      <LoaderTypeCard v-if="isLoadingFollowedPosts" />
      <PostsFeedFollow />
    </div>
    <div v-else-if="filteredPostsTab">
      <PostsFeedSearch
        :keyword="keyword"
        :genre="genre"
        :tag="tag"
      />
    </div>
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
    },
    isLoadingPosts () {
      return !this.posts.length
    },
    isLoadingFollowedPosts () {
      return !this.followedPosts.length
    }
  },
  methods: {
    ...mapActions({
      createPost: 'modules/post/createPost'
    })
  }
}
</script>
