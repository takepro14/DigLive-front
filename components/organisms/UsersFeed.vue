<template>
  <div
    class="mx-auto"
  >
    <div
      v-if="newUsersTab"
    >
      <div
        v-if="!isSearching"
      >
        <div
          v-for="user in users"
          :key="user.id"
        >
          <User
            v-if="user.id !== currentUser.id"
            :user="user"
            :currentUser="currentUser"
            class="my-6"
          />
        </div>
      </div>
      <div
        v-else-if="isSearching"
      >
        <div
          v-if="keyword !== ''"
        >
          <h3>
            {{ keyword }} の検索結果 ({{ filteredUsers.length }})
          </h3>
        </div>
        <div
          v-else-if="genre !== ''"
        >
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
          />
        </div>
      </div>
    </div>
    <div
      v-else-if="followedUsersTab"
    >
      <div
        v-for="user in followedUsers"
        :key="user.id"
      >
        <User
          v-if="user.id !== currentUser.id"
          :user="user"
          :currentUser="currentUser"
          class="my-6"
        />
      </div>
    </div>
  </div>
</template>

<script>
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
