<template>
  <v-card
    width="600"
    class="mx-auto"
    min-width="300"
    tile
  >
    <v-toolbar
      color="blue darken-1"
      dark
      flat
    >
      <v-toolbar-title>
        <v-icon class="mr-3">
          mdi-menu
        </v-icon>
        Menu
      </v-toolbar-title>
    </v-toolbar>
    <v-list>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="menu in menus"
          :key="menu.id"
          @click="menuClick(menu)"
        >
          <v-list-item-icon>
            <v-icon>
              {{ menu.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ menu.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        {
          title: 'つぶやき',
          name: 'postsTab',
          icon: 'mdi-comment-text-outline'
        },
        {
          title: 'ユーザ',
          name: 'usersTab',
          icon: 'mdi-account'
        },
        {
          title: '掲示板',
          name: 'boardsTab',
          icon: 'mdi-bulletin-board'
        }
      ]
    }
  },
  methods: {
    menuClick (menu) {
      this.$emit('menuClickEvent', menu.name)
    }
  }
}
</script>
