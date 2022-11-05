<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
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
  watch: {
    keyword () {
      this.getFilteredPostsClear()
      this.getFilteredUsersClear()
      if (this.keyword !== '') {
        this.delaySearchPosts()
        this.delaySearchUsers()
      }
    },
    genre () {
      this.getFilteredPostsClear()
      this.getFilteredUsersClear()
      if (this.genre !== '') {
        this.genreSearchPosts()
        this.genreSearchUsers()
      }
    },
    tag () {
      this.getFilteredPostsClear()
      this.getFilteredUsersClear()
      if (this.tag !== '') {
        this.tagSearchPosts()
      }
    }
  },
  methods: {
    ...mapActions({
      getFilteredPosts: 'modules/post/getFilteredPosts',
      getFilteredPostsZero: 'modules/post/getFilteredPostsZero',
      getFilteredPostsClear: 'modules/post/getFilteredPostsClear',
      getFilteredUsers: 'modules/user/getFilteredUsers',
      getFilteredUsersZero: 'modules/user/getFilteredUsersZero',
      getFilteredUsersClear: 'modules/user/getFilteredUsersClear'
    }),
    keywordSearchPosts () {
      this.$emit('startSearchEvent')
      this.$axios.$get('api/v1/posts/search', {
        params: {
          post_keyword: this.keyword
        }
      })
        .then((postsArray) => {
          postsArray.length
            ? this.getFilteredPosts(postsArray)
            : this.getFilteredPostsZero()
          this.$emit('stopSearchEvent')
        })
        .catch((error) => {
          console.error(error)
        })
    },
    genreSearchPosts () {
      this.$emit('startSearchEvent')
      this.$axios.$get('api/v1/posts/search', { params: { post_genre: this.genre } })
        .then((postsArray) => {
          postsArray.length
            ? this.getFilteredPosts(postsArray)
            : this.getFilteredPostsZero()
          this.$emit('stopSearchEvent')
        })
        .catch((error) => {
          console.error(error)
        })
    },
    tagSearchPosts () {
      this.$emit('startSearchEvent')
      this.$axios.$get('api/v1/posts/search', { params: { post_tag: this.tag } })
        .then((postsArray) => {
          postsArray.length
            ? this.getFilteredPosts(postsArray)
            : this.getFilteredPostsZero()
          this.$emit('stopSearchEvent')
        })
        .catch((error) => {
          console.error(error)
        })
    },
    keywordSearchUsers () {
      this.$emit('startSearchEvent')
      this.$axios.$get('api/v1/users/search', { params: { user_keyword: this.keyword } })
        .then((usersArray) => {
          usersArray.length
            ? this.getFilteredUsers(usersArray)
            : this.getFilteredUsersZero()
          this.$emit('stopSearchEvent')
        })
        .catch((error) => {
          console.error(error)
        })
    },
    genreSearchUsers () {
      this.$emit('startSearchEvent')
      this.$axios.$get('api/v1/users/search', { params: { user_genre: this.genre } })
        .then((usersArray) => {
          usersArray.length
            ? this.getFilteredUsers(usersArray)
            : this.getFilteredUsersZero()
          this.$emit('stopSearchEvent')
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  created () {
    this.delaySearchPosts = _.debounce(this.keywordSearchPosts, 500)
    this.delaySearchUsers = _.debounce(this.keywordSearchUsers, 500)
  }
}
</script>
