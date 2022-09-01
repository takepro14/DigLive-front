<template>
  <div>
    <Post
      v-for="post in posts"
      :key="post.id"
      :post="post"
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
      getTags: 'modules/tag/getTags'
    })
  },
  created () {
    this.getPosts()
    this.getTags()
  }
}
</script>
