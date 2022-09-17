<template>
  <div
    class="mx-auto"
  >
    <div
      v-if="newPostsTab"
    >
      <div
        v-if="!isSearching"
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
      </div>
      <div
        v-else-if="isSearching"
      >
        <div
          v-if="keyword !== ''"
        >
          <h3>
            {{ keyword }} の検索結果 ({{ filteredPosts.length }})
          </h3>
        </div>
        <div
          v-else-if="genre !== ''"
        >
          <h3>
            {{ genre }} の検索結果 ({{ filteredPosts.length }})
          </h3>
        </div>
        <div
          v-else-if="tag !== ''"
        >
          <h3>
            {{ tag }} の検索結果 ({{ filteredPosts.length }})
          </h3>
        </div>
        <Post
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
          :currentUserId="currentUserId"
          @likePostEvent="likePost"
          @unLikePostEvent="unLikePost"
          @destroyPostEvent="destroyPost"
        />
      </div>
    </div>
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
      <!-- TODO: 検索時実装予定 -->
    </div>
    <PostCreateDialog
      :genres="genres"
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
    genre: {
      type: String
    },
    tag: {
      type: String
    },
    followedUsersPosts: {
      type: Array
    },
    genres: {
      type: Array
    },
    tags: {
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
    },
    isSearching () {
      return (!!this.keyword) || (!!this.tag) || (!!this.genre)
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
