<template>
  <v-card>
    <v-toolbar
      color="header"
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
      <v-list-item-group color="header">
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
  props: {
    menus: {
      type: Array
    }
  },
  methods: {
    menuClick (menu) {
      this.$emit('menuClickEvent', menu.name)
    }
  }
}
</script>
