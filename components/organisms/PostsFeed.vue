<template>
  <div class="mx-auto" >
    <div v-if="newPostsTab" >
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
    <div v-else-if="followedPostsTab" >
      <Post
        v-for="post in followedPosts"
        :key="post.id"
        :post="post"
        :currentUserId="currentUserId"
        @likePostEvent="likePost"
        @unLikePostEvent="unLikePost"
        @destroyPostEvent="destroyPost"
      />
    </div>
    <div v-else-if="filteredPostsTab" >
      <div v-if="keyword !== ''" >
        <h3>
          {{ keyword }} の検索結果 ({{ filteredPosts.length }})
        </h3>
      </div>
      <div v-else-if="genre !== ''" >
        <h3>
          {{ genre }} の検索結果 ({{ filteredPosts.length }})
        </h3>
      </div>
      <div v-else-if="tag !== ''" >
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
    menu: {
      type: String
    },
    tab: {
      type: String
    },
    genres: {
      type: Array
    },
    tags: {
      type: Array
    },
    posts: {
      type: Array
    },
    followedPosts: {
      type: Array
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
    }
  },
  data ({ $store }) {
    return {
      currentUserId: $store.state.user.current.id
    }
  },
  computed: {
    newPostsTab () {
      return (this.menu === 'postsMenu') && (this.tab === 'newTab')
    },
    followedPostsTab () {
      return (this.menu === 'postsMenu') && (this.tab === 'followTab')
    },
    filteredPostsTab () {
      return (this.menu === 'searchMenu') && (this.tab === 'postsTab')
    }
    // isSearching () {
    //   return (!!this.keyword) || (!!this.tag) || (!!this.genre)
    // }
  },
  methods: {
    ...mapActions({
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost',
      createPost: 'modules/post/createPost',
      destroyPost: 'modules/post/destroyPost'
    })
  }
}
</script>
