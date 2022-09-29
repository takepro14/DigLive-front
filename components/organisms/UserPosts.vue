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
        v-for="(post, index) in userPosts"
        :key="`user-posts-${index}`"
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
      userPostsPage: 'modules/post/userPostsPage',
      userPosts: 'modules/post/userPosts'
    })
  },
  methods: {
    ...mapActions({
      getUserPostsPage: 'modules/post/getUserPostsPage',
      getUserPosts: 'modules/post/getUserPosts',
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost',
      destroyPost: 'modules/post/destroyPost'
    }),
    async infiniteHandler ($state) {
      if (!this.userPosts.length) {
        this.isLoading = true
      }
      await this.$axios.$get('/api/v1/posts', {
        params: {
          page: this.userPostsPage,
          post_user_id: this.user.id
        }
      })
        .then((data) => {
          setTimeout(() => {
            if (this.userPostsPage <= data.kaminari.pagination.pages) {
              this.getUserPostsPage()
              this.getUserPosts(data.posts)
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
