<template>
  <v-card
    class="mx-auto"
    tile
  >
    <v-toolbar
      color="subheader"
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
          title: 'ライブ映像',
          name: 'postsMenu',
          icon: 'mdi-microphone-variant'
        },
        {
          title: 'ユーザー',
          name: 'usersMenu',
          icon: 'mdi-account-multiple'
        },
        {
          title: 'チャットルーム',
          name: 'boardsMenu',
          icon: 'mdi-wechat'
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
