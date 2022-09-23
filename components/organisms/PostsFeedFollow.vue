<template>
  <div class="mx-auto">
    <v-row v-if="isLoadingFollowedPosts">
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
    <v-row>
      <v-col
        v-for="post in followedPosts"
        :key="post.id"
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
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      currentUser: 'modules/user/currentUser',
      followedPage: 'modules/post/followedPage',
      followedPosts: 'modules/post/followedPosts'
    }),
    isLoadingFollowedPosts () {
      return !this.followedPosts.length
    }
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
      // 初回読み込みで1pageなので2page〜を読み込むためにここでgetPageする
      this.getFollowedPage()
      await this.$axios.$get('/api/v1/posts', {
        params: {
          page: this.followedPage,
          user_id: this.currentUser.id
        }
      })
        .then((data) => {
          setTimeout(() => {
            if (this.followedPage <= data.kaminari.pagination.pages) {
              this.getFollowedPosts(data.posts)
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
  },
  async mounted () {
    await this.$axios.$get('/api/v1/posts', {
      params: {
        page: this.followedPage,
        user_id: this.currentUser.id
      }
    })
      .then((data) => {
        this.getFollowedPosts(data.posts)
      })
  }
}
</script>
