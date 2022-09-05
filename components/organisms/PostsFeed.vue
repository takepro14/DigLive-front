<template>
  <div
    class="mx-auto"
  >
    <Loader
      v-if="isLoading === true"
    />
    <!--
      最新の投稿を表示する(フォロー関係なく)
    -->
    <div
      v-if="dispNewPosts"
    >
      <v-container>
        <v-row>
          <v-col>
            <Post
              v-for="post in posts"
              :key="post.id"
              :post="post"
              :currentUserId="currentUserId"
              @likePostEvent="likePost"
              @unLikePostEvent="unLikePost"
              @destroyPostEvent="destroyPost"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <PostCreateDialog />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    tab: {
      type: String
    }
  },
  data ({ $store }) {
    return {
      currentUserId: $store.state.user.current.id,
      isLoading: true
    }
  },
  computed: {
    ...mapGetters({
      posts: 'modules/post/posts',
      tags: 'modules/tag/tags'
    }),
    dispNewPosts () {
      return this.tab === 'New'
    }
    // postsByFollowedUser () {
    //   return this.posts.filter(post => post.user_id === currentUserId)
    // }
  },
  methods: {
    ...mapActions({
      getPosts: 'modules/post/getPosts',
      getTags: 'modules/tag/getTags',
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost',
      destroyPost: 'modules/post/destroyPost'
    }),
    stopLoading () {
      this.isLoading = false
    }
  },
  inject: {
    theme: {
      default: { isDark: false }
    }
  },
  async fetch () {
    await this.getPosts()
      .then(() => {
        this.getTags()
      })
      .then(() => {
        this.stopLoading()
      })
  }
}
</script>
