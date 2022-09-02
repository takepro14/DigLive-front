<template>
  <v-container>
    <v-row>
      <v-col>
        <SideMenu
          @menuClickEvent="menuClick"
        />
        <PostsFeed
          v-if="menu === 'postsTab'"
        />
        <UsersFeed
          v-if="menu === 'usersTab'"
        />
        <BoardsFeed
          v-if="menu === 'boardsTab'"
        />
        <PostCreateDialog />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'logged-in',
  middleware: [
    'authentication'
  ],
  data () {
    return {
      menu: 'postsTab'
    }
  },
  methods: {
    menuClick (value) {
      this.menu = value
    }
  }
}
</script>
