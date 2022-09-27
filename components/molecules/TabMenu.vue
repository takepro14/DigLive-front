<template>
  <v-card
    class="mx-auto"
    width="100%"
  >
    <v-toolbar
      color="header"
      dark
      flat
    >
      <template #extension>
        <v-tabs
          centered
          slider-color="slider"
          grow
        >
          <v-tab
            v-for="tab in tabs"
            :key="tab.id"
            @click="tabClick(tab.name)"
          >
            {{ tab.title }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  props: {
    menu: {
      type: String
    },
    mainTabs: {
      type: Array
    },
    searchTabs: {
      type: Array
    }
  },
  computed: {
    tabs () {
      if (this.menu === 'postsMenu' || this.menu === 'usersMenu') {
        return this.mainTabs
      } else {
        return this.searchTabs
      }
    }
  },
  methods: {
    tabClick (tabName) {
      this.$emit('tabClickEvent', tabName)
    }
  }
}
</script>
