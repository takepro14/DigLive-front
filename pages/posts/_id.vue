<template>
  <v-container>
    <Toaster />
    <v-icon
      x-large
      @click="historyBack"
    >
      mdi-keyboard-backspace
    </v-icon>
    <Post
      :post="post"
      @likePostEvent="likePost"
      @unLikePostEvent="unLikePost"
    />
    <!-- {{ post }} -->
    <CommentCreateDialog
      :post="post"
      @addCommentEvent="addComment"
      @createCommentEvent="createComment"
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
  async fetch ({ $axios, route, store }) {
    await $axios.$get(`/api/v1/posts/${route.params.id}`)
      .then((post) => {
        store.dispatch('modules/post/getPost', post)
      })
  },
  computed: {
    ...mapGetters({
      post: 'modules/post/post'
    }),
    isCommented () {
      return !!this.post.comments
    }
  },
  methods: {
    ...mapActions({
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost',
      createComment: 'modules/post/createComment'
    }),
    addComment () {
      this.$store.dispatch('modules/post/emitReloadComments', this.post_id)
    },
    historyBack () {
      this.$router.go(-1)
    }
  }
}
</script>
