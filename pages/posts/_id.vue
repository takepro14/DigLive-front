<template>
  <v-container>
    <Toaster />
    <HistoryBack class="py-4" />
    <v-row>
      <v-col>
        <Post
          :post="post"
          :currentUserId="currentUserId"
          @likePostEvent="likePost"
          @unLikePostEvent="unLikePost"
          @destroyPostEvent="destroyPost"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <CommentCreateDialog
          :post="post"
          @addCommentEvent="addComment"
          @createCommentEvent="createComment"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="comment in post.comments"
        :key="comment.id"
        class="d-flex align-content-end flex-wrap"
        cols="12"
        sm="12"
        md="6"
        lg="4"
        xl="3"
      >
        <Comment
          :comment="comment"
          :currentUserId="currentUserId"
          @destroyCommentEvent="destroyComment"
        />
      </v-col>
    </v-row>
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
      return !!this.post.comments
    }
  },
  methods: {
    ...mapActions({
      getPostClear: 'modules/post/getPostClear',
      destroyPost: 'modules/post/destroyPost',
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost',
      createComment: 'modules/post/createComment',
      destroyComment: 'modules/post/destroyComment'
    }),
    addComment () {
      this.$store.dispatch('modules/post/emitReloadComments', this.post_id)
    }
  },
  async fetch ({ $axios, route, store }) {
    await $axios.$get(`/api/v1/posts/${route.params.id}`)
      .then((post) => {
        store.dispatch('modules/post/getPost', post)
      })
  },
  destroyed () {
    this.getPostClear()
  }
}
</script>
