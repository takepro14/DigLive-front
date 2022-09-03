<template>
  <div
    class="mx-auto"
  >
    <Loader
      v-if="isLoading === true"
    />
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
  data () {
    return {
      isLoading: true
    }
  },
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
    }),
    stopLoading () {
      this.isLoading = false
    }
  },
  inject: {
    theme: {
      default: { isDark: false }
    }
  },
  async fetch () {
    await this.getPosts()
      .then(() => {
        this.getTags()
      })
      .then(() => {
        this.stopLoading()
      })
  }
}
</script>
