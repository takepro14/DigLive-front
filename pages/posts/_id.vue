<template>
  <v-container>
    <Post
      :post="post"
      @likePostEvent="likePost"
      @unLikePostEvent="unLikePost"
    />
    <CommentCreateDialog
      :post="post"
      @addCommentEvent="addComment"
    />
    <CommentsFeed
      v-if="isCommented"
      :post="post"
      :currentUserId="currentUserId"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'logged-in',
  data ({ $store, $route }) {
    return {
      currentUserId: $store.state.user.current.id,
      post_id: $route.params.id
    }
  },
  computed: {
    ...mapGetters({
      post: 'modules/post/post'
    }),
    isCommented () {
      return this.post.comments.length !== 0
    }
  },
  methods: {
    ...mapActions({
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost'
    }),
    addComment () {
      this.$store.dispatch('modules/post/emitReloadComments', this.post_id)
    }
  },
  async fetch ({ $axios, params, store }) {
    await $axios.$get(`/api/v1/posts/${params.id}`)
      .then((post) => {
        store.dispatch('modules/post/emitSetPost', post)
      })
  }
}
</script>
