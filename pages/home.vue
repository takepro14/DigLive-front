<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <SideMenu
          @menuClickEvent="menuClick"
        />
        <!-- <YouTube /> -->
      </v-col>
      <v-col cols="8">
        <SubMenu
          @tabClickEvent="tabClick"
        />
          <!-- <YouTube /> -->
        <PostsFeed
          v-if="menu === 'postsTab'"
          :tab="tab"
        />
        <UsersFeed
          v-if="menu === 'usersTab'"
        />
        <BoardsFeed
          v-if="menu === 'boardsTab'"
        />
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
      menu: 'postsTab',
      tab: 'New'
    }
  },
  methods: {
    menuClick (value) {
      this.menu = value
    },
    tabClick (value) {
      this.tab = value
    }
  }
}
</script>
