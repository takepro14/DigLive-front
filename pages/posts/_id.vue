<template>
  <v-container>
    <Post
      :post="post"
    />
    <CommentCreateDialog
      :post="post"
      @reloadComments="emitEvent"
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
    emitEvent (value) {
      this.$store.dispatch('modules/post/reloadComment', value)
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
