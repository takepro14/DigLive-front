<template>
  <div class="mx-auto">
    <!-- keyword: {{ keyword }}
    genre: {{ genre }}
    tag: {{ tag }} -->
    <!-- resultPosts: {{ resultPosts }} -->
    <h3 v-if="isSearching">
      {{ keyword || genre || tag }} の検索結果 ({{ filteredPosts.length }})
    </h3>
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
        v-for="post in filteredPosts"
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
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'modules/user/currentUser',
      filteredPosts: 'modules/post/filteredPosts'
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
        this.getFilteredPostsClear()
      }
    },
    genre () {
      if (this.genre !== '') {
        this.genreSearchPosts()
      } else {
        this.getFilteredPostsClear()
      }
    },
    tag () {
      if (this.tag !== '') {
        this.tagSearchPosts()
      } else {
        this.getFilteredPostsClear()
      }
    }
  },
  methods: {
    ...mapActions({
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost',
      destroyPost: 'modules/post/destroyPost',
      getFilteredPosts: 'modules/post/getFilteredPosts',
      getFilteredPostsZero: 'modules/post/getFilteredPostsZero',
      getFilteredPostsClear: 'modules/post/getFilteredPostsClear'
    }),
    keywordSearchPosts () {
      this.isLoading = true
      this.$axios.$get('api/v1/posts/search', {
        params: {
          post_keyword: this.keyword
        }
      })
        .then((postsArray) => {
          if (postsArray.length) {
            this.getFilteredPosts(postsArray)
          } else {
            this.getFilteredPostsZero()
          }
          this.isLoading = false
        })
        .catch((error) => {
          console.error(error)
        })
    },
    genreSearchPosts () {
      this.isLoading = true
      this.$axios.$get('api/v1/posts/search', {
        params: {
          post_genre: this.genre
        }
      })
        .then((postsArray) => {
          if (postsArray.length) {
            this.getFilteredPosts(postsArray)
          } else {
            this.getFilteredPostsZero()
          }
          this.isLoading = false
        })
        .catch((error) => {
          console.error(error)
        })
    },
    tagSearchPosts () {
      this.isLoading = true
      this.$axios.$get('api/v1/posts/search', {
        params: {
          post_tag: this.tag
        }
      })
        .then((postsArray) => {
          if (postsArray.length) {
            this.getFilteredPosts(postsArray)
          } else {
            this.getFilteredPostsZero()
          }
          this.isLoading = false
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  created () {
    this.delaySearch = _.debounce(this.keywordSearchPosts, 500)
  }
}
</script>
