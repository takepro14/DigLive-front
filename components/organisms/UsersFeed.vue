<template>
  <div class="mx-auto" >
    <div v-if="newUsersTab" >
      <v-row>
        <v-col
          v-for="user in users"
          :key="user.id"
          cols="12"
          sm="12"
          md="12"
          lg="6"
          xl="4"
        >
        <User
          v-if="user.id !== currentUser.id"
          :user="user"
          :currentUser="currentUser"
          class="my-6"
          @followEvent="follow"
          @unfollowEvent="unfollow"
        />
      </v-col>
    </v-row>
    </div>
    <div v-else-if="followedUsersTab" >
      <v-row>
        <v-col
          v-for="user in followedUsers"
          :key="user.id"
          cols="12"
          sm="12"
          md="12"
          lg="6"
          xl="4"
        >
          <User
            v-if="user.id !== currentUser.id"
            :user="user"
            :currentUser="currentUser"
            class="my-6"
            @followEvent="follow"
            @unfollowEvent="unfollow"
          />
        </v-col>
      </v-row>
    </div>
    <div v-else-if="filteredUsersTab" >
      <div v-if="keyword !== ''" >
        <h3>
          {{ keyword }} の検索結果 ({{ filteredUsers.length }})
        </h3>
      </div>
      <div v-else-if="genre !== ''" >
        <h3>
          {{ genre }} の検索結果 ({{ filteredUsers.length }})
        </h3>
      </div>
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
            v-if="user.id !== currentUser.id"
            :user="user"
            :currentUser="currentUser"
            class="my-6"
            @followEvent="follow"
            @unfollowEvent="unfollow"
          />
        </v-col>
      </v-row>
    </div>
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
    currentUser: {
      type: Object
    },
    users: {
      type: Array
    },
    followedUsers: {
      type: Array
    },
    filteredUsers: {
      type: Array
    },
    keyword: {
      type: String
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
      return (this.menu === 'usersMenu') && (this.tab === 'newTab')
    },
    followedUsersTab () {
      return (this.menu === 'usersMenu') && (this.tab === 'followTab')
    },
    filteredUsersTab () {
      return (this.menu === 'searchMenu') && (this.tab === 'usersTab')
    }
  }
}
</script>
