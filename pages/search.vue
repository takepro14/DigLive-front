<template>
  <v-container>
    <PostSearchFormKeyword />
    <PostSearchFormTag />
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
  computed: {
    ...mapGetters({
      posts: 'modules/post/posts',
      // 検索結果のpostオブジェクトの配列
      filteredPosts: 'modules/post/filteredPosts'
    })
  },
  methods: {
    ...mapActions({
      getPosts: 'modules/post/getPosts'
    })
  },
  mounted () {
    this.getPosts()
  }
}
</script>
