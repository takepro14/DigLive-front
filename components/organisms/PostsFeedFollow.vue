<template>
  <div class="mx-auto">
    <v-row v-if="isLoading">
      <v-col
        v-for="n in 10"
        :key="n"
        cols="12"
        sm="12"
        md="12"
        lg="6"
        xl="4"
      >
        <LoaderTypeCard />
      </v-col>
    </v-row>
    <v-row class="mb-8">
      <v-col
        v-for="(post, index) in followedPosts"
        :key="`post-follow-${index}`"
        cols="12"
        sm="12"
        md="12"
        lg="6"
        xl="4"
      >
        <Post
          :post="post"
          :currentUserId="currentUser.id"
          @likePostEvent="likePost"
          @unLikePostEvent="unLikePost"
          @destroyPostEvent="destroyPost"
        />
      </v-col>
    </v-row>
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
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'modules/user/currentUser',
      followedPage: 'modules/post/followedPage',
      followedPosts: 'modules/post/followedPosts'
    })
  },
  methods: {
    ...mapActions({
      getFollowedPage: 'modules/post/getFollowedPage',
      getFollowedPosts: 'modules/post/getFollowedPosts',
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost',
      destroyPost: 'modules/post/destroyPost'
    }),
    async infiniteHandler ($state) {
      if (!this.followedPosts.length) {
        this.isLoading = true
      }
      await this.$axios.$get('/api/v1/posts', {
        params: {
          page: this.followedPage,
          user_id: this.currentUser.id
        }
      })
        .then((data) => {
          setTimeout(() => {
            if (this.followedPage <= data.kaminari.pagination.pages) {
              this.getFollowedPage()
              this.getFollowedPosts(data.posts)
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
