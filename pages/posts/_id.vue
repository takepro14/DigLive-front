<template>
  <v-container>
    <Post
      :post="post"
    />
    <CommentCreateDialog
      :post="post"
      @addCommentEvent="addComment"
    />
    <Comment
      :post="post"
    />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'logged-in',
  data ({ $route }) {
    return {
      post_id: $route.params.id
    }
  },
  computed: {
    ...mapGetters({
      post: 'modules/post/post'
    })
  },
  methods: {
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
