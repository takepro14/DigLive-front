<template>
  <div>
    <!-- 描画なし(scriptのみ) -->
    <CommonSearch
      :keyword="keyword"
      :genre="genre"
      @startSearchEvent="isLoading = true"
      @stopSearchEvent="isLoading = false"
    />
    <!-- /描画なし(scriptのみ) -->
    <v-list-item v-if="isSearching">
      <v-list-item-title>
        <span>
          {{ keyword || genre }} の検索結果：
        </span>
        <span class="font-weight-bold">
          {{ filteredUsers.length }}件
        </span>
      </v-list-item-title>
    </v-list-item>
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
    <v-row class="mt-1 mb-8">
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
          @followEvent="follow"
          @unfollowEvent="unfollow"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
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
  methods: {
    ...mapActions({
      follow: 'modules/user/follow',
      unfollow: 'modules/user/unfollow'
    })
  }
}
</script>
