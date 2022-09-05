<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="3" lg="3" xl="3">
        <SideMenu
          @menuClickEvent="menuClick"
        />
      </v-col>
      <v-col cols="12" sm="12" md="9" lg="9" xl="9">
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
