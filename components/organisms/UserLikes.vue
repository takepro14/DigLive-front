<template>
  <div>
    <Post
      v-for="post in userLikes"
      :key="post.id"
      :post="post"
      @likePostEvent="likePost"
      @unLikePostEvent="unLikePost"
    />
    <VueInfiniteLoading
      ref="infiniteLoading"
      spinner="spiral"
      @infinite="infiniteHandler"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      currentUser: 'modules/user/currentUser',
      user: 'modules/user/user',
      userLikesPage: 'modules/post/userLikesPage',
      userLikes: 'modules/post/userLikes'
    })
  },
  methods: {
    ...mapActions({
      getUserLikesPage: 'modules/post/getUserLikesPage',
      getUserLikes: 'modules/post/getUserLikes',
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost',
      destroyPost: 'modules/post/destroyPost'
    }),
    async infiniteHandler ($state) {
      await this.$axios.$get('/api/v1/posts', {
        params: {
          page: this.userLikesPage,
          like_user_id: this.user.id
        }
      })
        .then((data) => {
          setTimeout(() => {
            if (this.userLikesPage <= data.kaminari.pagination.pages) {
              this.getUserLikesPage()
              this.getUserLikes(data.posts)
              $state.loaded()
            } else {
              $state.complete()
            }
          }, 1000)
        })
        .catch(() => {
          $state.complete()
        })
    }
  }
}
</script>
