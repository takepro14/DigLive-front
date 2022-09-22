<template>
  <div class="mx-auto" >
    <div v-if="newUsersTab">
      <LoaderTypeCard v-if="isLoadingUsers" />
      <UsersFeedNew  />
    </div>
    <div v-else-if="followedUsersTab">
      <LoaderTypeCard :repeat="5" v-if="isLoadingFollowedUsers" />
      <UsersFeedFollow />
    </div>
    <div v-else-if="filteredUsersTab">
      <UsersFeedSearch
        :keyword="keyword"
        :genre="genre"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    menu: {
      type: String
    },
    tab: {
      type: String
    },
    keyword: {
      type: String
    },
    genre: {
      type: String
    }
  },
  computed: {
    ...mapGetters({
      users: 'modules/user/users',
      followedUsers: 'modules/user/followedUsers'
    }),
    newUsersTab () {
      return (this.menu === 'usersMenu') && (this.tab === 'newTab')
    },
    followedUsersTab () {
      return (this.menu === 'usersMenu') && (this.tab === 'followTab')
    },
    filteredUsersTab () {
      return (this.menu === 'searchMenu') && (this.tab === 'usersTab')
    },
    isLoadingUsers () {
      return !this.users.length
    },
    isLoadingFollowedUsers () {
      return !this.followedUsers.length
    }
  }
}
</script>
