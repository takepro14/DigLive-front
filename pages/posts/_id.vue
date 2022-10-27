<template>
  <v-container class="pb-16">
    <Toaster />
    <HistoryBack class="pb-4" />
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
          @createCommentEvent="createComment"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-timeline
          v-if="post.comments.length"
          dense
        >
          <Comment
            v-for="comment in post.comments"
            :key="comment.id"
            :comment="comment"
            :currentUserId="currentUserId"
            @destroyCommentEvent="destroyComment"
          />
        </v-timeline>
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
    })
  },
  methods: {
    ...mapActions({
      getPostClear: 'modules/post/getPostClear',
      destroyPost: 'modules/post/destroyPost',
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost',
      createComment: 'modules/post/createComment',
      destroyComment: 'modules/post/destroyComment'
    })
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
