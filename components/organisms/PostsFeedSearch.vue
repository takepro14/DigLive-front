<template>
  <div class="mx-auto">
    <!-- keyword: {{ keyword }}
    genre: {{ genre }}
    tag: {{ tag }} -->
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
          :currentUserId="currentUser.id"
          @likePostEvent="likePost"
          @unLikePostEvent="unLikePost"
          @destroyPostEvent="destroyPost"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
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
    ...mapGetters({
      currentUser: 'modules/user/currentUser'
    }),
    isSearching () {
      return this.keyword || this.genre || this.tag
    }
  },
  watch: {
    keyword () {
      if (this.keyword !== '') {
        this.delaySearch()
      } else {
        this.resultPosts = []
      }
    },
    genre () {
      if (this.genre !== '') {
        this.genreSearchPosts()
      } else {
        this.resultPosts = []
      }
    },
    tag () {
      if (this.tag !== '') {
        this.tagSearchPosts()
      } else {
        this.resultPosts = []
      }
    }
  },
  methods: {
    ...mapActions({
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost',
      destroyPost: 'modules/post/destroyPost'
    }),
    keywordSearchPosts () {
      this.$axios.$get('api/v1/posts/search', {
        params: {
          post_keyword: this.keyword
        }
      })
        .then((postsArray) => {
          this.resultPosts = postsArray
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
        .then((postsArray) => {
          this.resultPosts = postsArray
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
        .then((postsArray) => {
          this.resultPosts = postsArray
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  created () {
    this.delaySearch = _.debounce(this.keywordSearchPosts, 1000)
  }
}
</script>
