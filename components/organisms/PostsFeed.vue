<template>
  <div
    class="mx-auto"
  >
    <!--
      最新タブ
    -->
    <div
      v-if="newPostsTab"
    >
      <!-- 非検索時(デフォルトビュー) -->
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
      <!-- 検索時 -->
      <div
        v-else-if="isSearching"
      >
        <!-- キーワード検索時 -->
        <div
          v-if="keyword !== ''"
        >
          <h3>
            {{ keyword }} の検索結果 ({{ filteredPosts.length }})
          </h3>
        </div>
        <!-- ジャンル検索時 -->
        <div
          v-else-if="genre !== ''"
        >
          <h3>
            {{ genre }} の検索結果 ({{ filteredPosts.length }})
          </h3>
        </div>
        <!-- タグ検索時 -->
        <div
          v-else-if="tag !== ''"
        >
          <h3>
            {{ tag }} の検索結果 ({{ filteredPosts.length }})
          </h3>
        </div>
        <!-- 検索結果 -->
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
    <!--
      フォロータブ
    -->
    <div
      v-else-if="followedPostsTab"
    >
      <!-- 非検索時(デフォルトビュー) -->
      <Post
        v-for="post in followedUsersPosts"
        :key="post.id"
        :post="post"
        :currentUserId="currentUserId"
        @likePostEvent="likePost"
        @unLikePostEvent="unLikePost"
        @destroyPostEvent="destroyPost"
      />
      <!-- 検索時 -->
      <!-- TODO: 実装予定 -->
    </div>
    <!--
      新規投稿ダイアログ
    -->
    <PostCreateDialog
      @createPostEvent="createPost"
      :genres="genres"
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
