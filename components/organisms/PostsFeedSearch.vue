<template>
  <div class="mx-auto">
    keyword: {{ keyword }}
    genre: {{ genre }}
    tag: {{ tag }}
    <!-- resultPosts: {{ resultPosts }} -->
    <h3 v-if="isSearching">
      {{ keyword || genre || tag }} の検索結果 ({{ resultPosts.length }})
    </h3>
    <v-row>
      <v-col
        v-for="post in resultPosts"
        :key="post.id"
        cols="12"
        sm="12"
        md="12"
        lg="6"
        xl="4"
      >
        <Post
          :post="post"
          :currentUserId="currentUserId"
          @likePostEvent="likePost"
          @unLikePostEvent="unLikePost"
          @destroyPostEvent="destroyPost"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
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
  data () {
    return {
      resultPosts: []
    }
  },
  computed: {
    isSearching () {
      return this.keyword || this.genre || this.tag
    }
  },
  watch: {
    keyword () {
      this.keywordSearchPosts()
    },
    genre () {
      this.genreSearchPosts()
    },
    tag () {
      this.tagSearchPosts()
    }
  },
  methods: {
    keywordSearchPosts () {
      this.$axios.$get('api/v1/posts/search', {
        params: {
          post_keyword: this.keyword
        }
      })
        .then((postsObj) => {
          this.resultPosts = postsObj
        })
        .catch((error) => {
          console.error(error)
        })
    },
    genreSearchPosts () {
      this.$axios.$get('api/v1/posts/search', {
        params: {
          post_genre: this.genre
        }
      })
        .then((postsObj) => {
          this.resultPosts = postsObj
        })
        .catch((error) => {
          console.error(error)
        })
    },
    tagSearchPosts () {
      this.$axios.$get('api/v1/posts/search', {
        params: {
          post_tag: this.tag
        }
      })
        .then((postsObj) => {
          this.resultPosts = postsObj
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>
