<template>
  <div>
    <div v-if="isLoading">
      <LoaderTypeCard
        v-for="n in 10"
        :key="n"
      />
    </div>
    <div class="mb-8">
      <Post
        v-for="(post, index) in userLikes"
        :key="`user-likes-${index}`"
        :post="post"
        :currentUserId="currentUser.id"
        @likePostEvent="likePost"
        @unLikePostEvent="unLikePost"
        @destroyPostEvent="destroyPost"
      />
    </div>
    <VueInfiniteLoading
      ref="infiniteLoading"
      spinner="spiral"
      @infinite="infiniteHandler"
    >
      <span slot="no-more">----- 投稿は以上です -----</span>
      <span slot="no-results">----- 投稿は以上です -----</span>
    </VueInfiniteLoading>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    user: {
      type: Object
    },
    currentUser: {
      type: Object
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
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
