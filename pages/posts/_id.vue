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
      createComment: 'modules/post/createComment',
      getPost: 'modules/post/getPost'
    }),
    addComment () {
      this.$store.dispatch('modules/post/emitReloadComments', this.post_id)
    },
    historyBack () {
      this.$router.go(-1)
    }
    // createComment (...args) {
    //   const [userId, postId, comment] = args
    //   const data = new FormData()
    //   data.append('comment[user_id]', userId)
    //   data.append('comment[post_id]', postId)
    //   data.append('comment[comment]', comment)
    //   this.$axios.post('/api/v1/comments', data)
    //     .then(() => {
    //       this.$store.dispatch('getToast', {
    //         msg: '投稿にコメントしました'
    //       })
    //     })
    // }
  },
  created () {
    this.getPost(this.post_id)
  }
  // async fetch ({ $axios, params, store }) {
  //   await $axios.$get(`/api/v1/posts/${params.id}`)
  //     .then((post) => {
  //       store.dispatch('modules/post/emitSetPost', post)
  //     })
  // }
}
</script>
