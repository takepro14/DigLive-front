<template>
  <div class="mx-auto">
    <div v-if="newUsersTab">
      <div v-if="!isSearching">
        <div
          v-for="user in users"
          :key="user.id"
        >
          <User
            v-if="user.id !== currentUser.id"
            :user="user"
            :currentUser="currentUser"
            class="my-6"
            @followEvent="follow"
            @unfollowEvent="unfollow"
          />
        </div>
      </div>
      <div v-else-if="isSearching">
        <div v-if="keyword !== ''">
          <h3>
            {{ keyword }} の検索結果 ({{ filteredUsers.length }})
          </h3>
        </div>
        <div v-else-if="genre !== ''">
          <h3>
            {{ genre }} の検索結果 ({{ filteredUsers.length }})
          </h3>
        </div>
        <div
          v-for="user in filteredUsers"
          :key="user.id"
        >
          <User
            v-if="user.id !== currentUser.id"
            :user="user"
            :currentUser="currentUser"
            class="my-6"
            @followEvent="follow"
            @unfollowEvent="unfollow"
          />
        </div>
      </div>
    </div>
    <div v-else-if="followedUsersTab">
      <div
        v-for="user in followedUsers"
        :key="user.id"
      >
        <User
          v-if="user.id !== currentUser.id"
          :user="user"
          :currentUser="currentUser"
          class="my-6"
          @followEvent="follow"
          @unfollowEvent="unfollow"
        />
      </div>
      <!-- TODO: 検索時実装予定 -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    users: {
      type: Array
    },
    keyword: {
      type: String
    },
    filteredUsers: {
      type: Array
    },
    currentUser: {
      type: Object
    },
    tab: {
      type: String
    },
    followedUsers: {
      type: Array
    },
    genre: {
      type: String
    }
  },
  methods: {
    ...mapActions({
      follow: 'modules/user/follow',
      unfollow: 'modules/user/unfollow'
    })
  },
  computed: {
    newUsersTab () {
      return this.tab === 'New'
    },
    followedUsersTab () {
      return this.tab === 'Follow'
    },
    isSearching () {
      return (!!this.keyword) || (!!this.genre)
    }
  }
}
</script>
