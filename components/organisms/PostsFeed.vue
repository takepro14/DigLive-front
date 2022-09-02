<template>
  <div
    class="mx-auto"
  >
    <Post
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @likePostEvent="likePost"
      @unLikePostEvent="unLikePost"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      posts: 'modules/post/posts',
      tags: 'modules/tag/tags'
    })
  },
  methods: {
    ...mapActions({
      getPosts: 'modules/post/getPosts',
      getTags: 'modules/tag/getTags',
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost'
    })
  },
  inject: {
    theme: {
      default: { isDark: false }
    }
  },
  created () {
    this.getPosts()
    this.getTags()
  }
}
</script>
