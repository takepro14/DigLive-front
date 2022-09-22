<template>
  <div>
    <!-- keyword: {{ keyword }}
    genre: {{ genre }} -->
    <!-- resultUsers: {{ resultUsers }} -->
    <h3 v-if="isSearching">
      {{ keyword || genre }} の検索結果 ({{ resultUsers.length }})
    </h3>
    <v-row>
      <v-col
        v-for="user in resultUsers"
        :key="user.id"
        cols="12"
        sm="12"
        md="12"
        lg="6"
        xl="4"
      >
        <User
          :user="user"
          :currentUser="currentUser"
          class="my-6"
          @followEvent="follow"
          @unfollowEvent="unfollow"
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
    }
  },
  data () {
    return {
      resultUsers: []
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'modules/user/currentUser'
    }),
    isSearching () {
      return this.keyword || this.genre
    }
  },
  watch: {
    keyword () {
      if (this.keyword !== '') {
        this.delaySearch()
      } else {
        this.resultUsers = []
      }
    },
    genre () {
      if (this.genre !== '') {
        this.genreSearchUsers()
      } else {
        this.resultUsers = []
      }
    }
  },
  methods: {
    ...mapActions({
      follow: 'modules/user/follow',
      unfollow: 'modules/user/unfollow'
    }),
    keywordSearchUsers () {
      this.$axios.$get('api/v1/users/search', {
        params: {
          user_keyword: this.keyword
        }
      })
        .then((usersObj) => {
          this.resultUsers = usersObj
        })
        .catch((error) => {
          console.error(error)
        })
    },
    genreSearchUsers () {
      this.$axios.$get('api/v1/users/search', {
        params: {
          user_genre: this.genre
        }
      })
        .then((usersObj) => {
          this.resultUsers = usersObj
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  created () {
    this.delaySearch = _.debounce(this.keywordSearchUsers, 1000)
  }
}
</script>
