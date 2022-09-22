<template>
  <div>
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
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      follow: 'modules/user/follow',
      unfollow: 'modules/user/unfollow'
    })
  },
  props: {
    keyword: {
      type: String
    },
    genre: {
      type: String
    }
  }
}
</script>
