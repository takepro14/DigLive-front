<template>
  <div class="mx-auto" >
    <UsersFeedNew
      v-if="newUsersTab"
    />
    <UsersFeedFollow
      v-else-if="followedUsersTab"
    />
    <UsersFeedSearch
      v-else-if="filteredUsersTab"
      :keyword="keyword"
      :genre="genre"
    />
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
    }
  }
}
</script>
