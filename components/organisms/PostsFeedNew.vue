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
    <v-row>
      <v-col
        v-for="(post, index) in posts"
        :key="`post-new-${index}`"
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
  data () {
    return {
      isLoading: false
    }
  },
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
      destroyPost: 'modules/post/destroyPost'
    }),
    async infiniteHandler ($state) {
      if (!this.posts.length) {
        this.isLoading = true
      }
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
