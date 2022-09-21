<template>
  <div class="mx-auto" >
      <UsersFeedNew v-if="newUsersTab" />
      <UsersFeedFollow v-else-if="followedUsersTab" />
      <UsersFeedSearch v-else-if="filteredUsersTab" />
  </div>
</template>

<script>
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
