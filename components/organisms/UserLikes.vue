<template>
  <div>
    <div v-if="isLoading">
      <LoaderTypeCard
        v-for="n in 10"
        :key="n"
      />
    </div>
    <Post
      v-for="(post, index) in userLikes"
      :key="`user-likes-${index}`"
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
  data () {
    return {
      isLoading: false
    }
  },
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
      if (!this.userLikes.length) {
        this.isLoading = true
      }
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
              this.isLoading = false
            } else {
              $state.complete()
              this.isLoading = false
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
