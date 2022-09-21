<template>
  <div class="mx-auto">
    <v-row>
      <v-col
        v-for="post in posts"
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
      page: 'modules/post/page',
      posts: 'modules/post/posts'
    })
  },
  methods: {
    ...mapActions({
      getPage: 'modules/post/getPage',
      getPosts: 'modules/post/getPosts',
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost',
      createPost: 'modules/post/createPost',
      destroyPost: 'modules/post/destroyPost'
    }),
    async infiniteHandler ($state) {
      await this.$axios.$get('/api/v1/posts', {
        params: {
          page: this.page
        }
      })
        .then((data) => {
          setTimeout(() => {
            if (this.page <= data.kaminari.pagination.pages) {
              this.getPage()
              this.getPosts(data.posts)
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
