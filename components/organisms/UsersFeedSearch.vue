<template>
  <div>
    <!-- keyword: {{ keyword }}
    genre: {{ genre }} -->
    <!-- filteredUsers: {{ filteredUsers }} -->
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
    <h3 v-if="isSearching">
      {{ keyword || genre }} の検索結果 ({{ filteredUsers.length }})
    </h3>
    <v-row>
      <v-col
        v-for="user in filteredUsers"
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
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'modules/user/currentUser',
      filteredUsers: 'modules/user/filteredUsers'
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
        this.getFilteredPostsClear()
      }
    },
    genre () {
      if (this.genre !== '') {
        this.genreSearchUsers()
      } else {
        this.getFilteredPostsClear()
      }
    }
  },
  methods: {
    ...mapActions({
      follow: 'modules/user/follow',
      unfollow: 'modules/user/unfollow',
      getFilteredUsers: 'modules/user/getFilteredUsers',
      getFilteredUsersZero: 'modules/user/getFilteredUsersZero',
      getFilteredPostsClear: 'modules/user/getFilteredUsersClear'
    }),
    keywordSearchUsers () {
      this.isLoading = true
      this.$axios.$get('api/v1/users/search', {
        params: {
          user_keyword: this.keyword
        }
      })
        .then((usersArray) => {
          if (usersArray.length) {
            this.getFilteredUsers(usersArray)
          } else {
            this.getFilteredUsersZero()
          }
          this.isLoading = false
        })
        .catch((error) => {
          console.error(error)
        })
    },
    genreSearchUsers () {
      this.isLoading = true
      this.$axios.$get('api/v1/users/search', {
        params: {
          user_genre: this.genre
        }
      })
        .then((usersArray) => {
          if (usersArray.length) {
            this.getFilteredUsers(usersArray)
          } else {
            this.getFilteredUsersZero()
          }
          this.isLoading = false
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  created () {
    this.delaySearch = _.debounce(this.keywordSearchUsers, 500)
  }
}
</script>
