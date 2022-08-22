<template>
  <div>
    <!-- タグ一覧 -->
    <div
      class="px-4"
    >
      <v-chip-group
        active-class="primary--text"
        column
      >
        <PostFeedTag
          v-for="tag in tags"
          :key="tag.id"
          :tag="tag"
        />
      </v-chip-group>
    </div>
    <!-- 投稿一覧 -->
    <PostFeed
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
    <PostDialog />
  </div>
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
