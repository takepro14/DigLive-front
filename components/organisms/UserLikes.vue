<template>
  <div>
    <Post
      v-for="post in likedPosts"
      :key="post.id"
      :post="post"
      @likePostEvent="likePost"
      @unLikePostEvent="unLikePost"
    />
  </div>
</template>

<script>
export default {
  methods: {
  // likedPosts () {
  //   return this.posts.filter((post) => {
  //     return post.likes.map((like) => { return like.id }).includes(this.user.id)
  //   })
  // }
  }
}
</script>
