<template>
  <div>
    <span>posts.vue</span>
    <!-- <post-feed /> -->
  </div>
</template>

<script>
// import PostFeed from '~/components/Post/PostFeed.vue'
export default {
  layout: 'after-login',
  middleware: ['authentication', 'get-post-list'],
  components: {
    // PostFeed
  }
}
</script>
