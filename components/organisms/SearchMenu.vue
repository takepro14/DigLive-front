<template>
  <v-card
    class="mx-auto"
    min-width="300"
    tile
  >
    <v-list
    >
      <v-subheader>
        検索カテゴリー
      </v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="menu in menus"
          :key="menu.id"
          @click="chooseMenu(menu)"
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
          title: '投稿',
          name: 'postSearchTab',
          icon: 'mdi-message'
        },
        {
          title: 'ユーザ',
          name: 'userSearchTab',
          icon: 'mdi-account'
        },
        {
          title: '掲示板',
          name: 'boardSearchTab',
          icon: 'mdi-bulletin-board'
        }
      ]
    }
  },
  methods: {
    chooseMenu (menu) {
      this.$emit('chooseMenuEvent', menu.name)
      console.log('emit発火')
    }
  }
}
</script>
