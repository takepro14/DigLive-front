<template>
  <div
    class="mx-auto"
  >
    <v-container>
      <v-row>
        <!-- 最新タブ -->
        <div
          v-if="newPostsTab"
        >
          <!-- 検索結果: 0件 -->
          <v-col
            v-if="(keyword !== '' || tag !== '') && !filteredPosts.length"
          >
            <h3>
              {{ keyword || tag }} の検索結果: {{ filteredPosts.length }}件
            </h3>
          </v-col>
          <!-- 検索結果: 1件以上 -->
          <v-col
            v-else-if="(keyword !== '' || tag !== '') && filteredPosts.length"
          >
            <h3>
              {{ keyword || tag }} の検索結果: {{ filteredPosts.length }}件
            </h3>
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
          <!-- 初期表示(フィード) -->
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
        </div>
        <!-- フォロータブ -->
        <div
          v-else-if="followedPostsTab"
        >
          <Post
            v-for="post in followedUsersPosts"
            :key="post.id"
            :post="post"
            :currentUserId="currentUserId"
            @likePostEvent="likePost"
            @unLikePostEvent="unLikePost"
            @destroyPostEvent="destroyPost"
          />
        </div>
      </v-row>
    </v-container>
    <PostCreateDialog
      @createPostEvent="createPost"
    />
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
    },
    keyword: {
      type: String
    },
    tag: {
      type: String
    },
    followedUsersPosts: {
      type: Array
    }
  },
  data ({ $store }) {
    return {
      currentUserId: $store.state.user.current.id
    }
  },
  computed: {
    newPostsTab () {
      return this.tab === 'New'
    },
    followedPostsTab () {
      return this.tab === 'Follow'
    }
  },
  methods: {
    ...mapActions({
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost',
      createPost: 'modules/post/createPost',
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
