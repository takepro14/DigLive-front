<template>
  <div>
    <v-menu
      app
      offset-x
      offset-y
      max-width="200"
    >
      <!-- サブメニューボタン -->
      <template #activator="{ on }">
        <v-btn
          icon
          v-on="on"
        >
          <v-icon large>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>
      <!-- /サブメニューボタン -->
      <!-- サブメニュー -->
      <v-list dense>
        <v-subheader>
          ログイン中のユーザー
        </v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>
              {{ $auth.user.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <template v-for="(menu, i) in menus">
          <v-divider
            v-if="menu.divider"
            :key="`menu-divider-${i}`"
          />
          <v-list-item
            :key="`menu-list-${i}`"
            @click="movePage(menu.path)"
          >
            <v-list-item-icon class="mr-2">
              <v-icon
                size="22"
                v-text="menu.icon"
              />
            </v-list-item-icon>
            <v-list-item-title>
              {{ $my.pageTitle(menu.name) }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
      <!-- /サブメニュー -->
    </v-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        { name: 'settings', icon: 'mdi-account-cog', path: '/settings' },
        { name: 'logout', icon: 'mdi-logout-variant', path: '/logout', divider: true }
      ]
    }
  },
  methods: {
    movePage (path) {
      this.$router.push(path)
      if (path === '/logout') {
        setTimeout(() => {
          this.$store.dispatch('getToast', { msg: 'ログアウトしました' })
        }, 500)
      }
    }
  }
}
</script>
