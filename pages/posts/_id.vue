<template>
  <v-container>
    <Toaster />
    <v-icon
      x-large
      @click="historyBack"
    >
      mdi-keyboard-backspace
    </v-icon>
    <v-row>
      <v-col>
        <Post
          :post="post"
          @likePostEvent="likePost"
          @unLikePostEvent="unLikePost"
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
      emitSetPostClear: 'modules/post/emitSetPostClear',
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost',
      createComment: 'modules/post/createComment',
      destroyComment: 'modules/post/destroyComment'
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
