<template>
  <div
    class="mx-auto"
  >
    <!--
      最新の投稿を表示する(フォロー関係なく)
    -->
    <div
      v-if="dispNewPosts"
    >
      <v-container>
        <v-row>
          <v-col
            v-if="Object.keys(filteredPosts).length !== 0"
          >
            <Post
              v-for="post in filteredPosts"
              :key="post.id"
              :post="post"
              :currentUserId="currentUserId"
              @likePostEvent="likePost"
              @unLikePostEvent="unLikePost"
              @destroyPostEvent="destroyPost"
            />
          </v-col>
          <v-col
            v-else
          >
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
import { mapActions } from 'vuex'
export default {
  props: {
    posts: {
      type: Array
    },
    tab: {
      type: String
    },
    filteredPosts: {
      type: Array
    }
  },
  data ({ $store }) {
    return {
      currentUserId: $store.state.user.current.id
    }
  },
  computed: {
    dispNewPosts () {
      return this.tab === 'New'
    }
  },
  methods: {
    ...mapActions({
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost',
      destroyPost: 'modules/post/destroyPost'
    })
  },
  inject: {
    theme: {
      default: { isDark: false }
    }
  }
}
</script>
