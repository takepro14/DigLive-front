<template>
  <div>
    <!-- _id.vueのパスに基づいて表示される：{{ $route.params.id }} -->
    <PostFeed
      :post="post"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    ...mapActions({
      getPost: 'modules/post/getPost'
    })
  },
  created () {
    this.getPost(this.post_id)
  }
}
</script>
