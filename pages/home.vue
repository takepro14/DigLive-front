<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="4" lg="4" xl="4">
        <SideMenu
          @menuClickEvent="menuClick"
        />
      </v-col>
      <v-col cols="12" sm="12" md="8" lg="8" xl="8">
        <TabMenu
          @tabClickEvent="tabClick"
        />
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
