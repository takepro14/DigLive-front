<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
    <!-- ↓↓↓メインコンテンツ領域↓↓↓ -->
    <!-- lists -->
    <v-container>
      <template>
        <v-card
          max-width="450"
          class="mx-auto"
        >
          <v-list three-line>
            <template v-for="user in users">
              <v-list-item :key="user.id">
                <v-list-item-avatar>
                  <v-img :src="`https://cdn.vuetifyjs.com/images/lists/${user.id}.jpg`"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ user.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </template>
    </v-container>

      <!-- tables -->
      <v-container>
        <v-card-text>
          <v-simple-table dense>
          <template
            v-if="users.length"
            v-slot:default
          >
            <thead>
            <tr>
              <th
                v-for="(key, i) in userKeys"
                :key="`key-${i}`"
              >
              {{ key }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="(user, i) in users"
              :key="`user-${i}`"
            >
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <!-- <td>{{ dateFormat(user.created_at) }}</td> -->
            </tr>
            </tbody>
          </template>
          <template v-else>
            ユーザーが存在しません
          </template>
          </v-simple-table>
        </v-card-text>
      </v-container>
    </v-main>
    <home-bottom-menu />
    <!-- ↑↑↑メインコンテンツ領域↑↑↑ -->
  </v-app>
</template>

<script>
import HomeBottomMenu from '~/components/Home/HomeBottomMenu'

export default ({
  data: () => ({
    // ナビゲーションドロワーが開閉する
    drawer: null
    // items: [
    //   { header: 'ユーザー一覧' },
    //   {
    //     avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    //     title: 'test1',
    //     subtitle: 'test1 description'
    //   },
    //   { divider: true, inset: true },
    //   {
    //     avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    //     title: 'test1',
    //     subtitle: 'test1 description'
    //   },
    //   { divider: true, inset: true }
    // ]
  }),
  components: {
    HomeBottomMenu
  },
  async asyncData ({ $axios }) {
    let users = []
    await $axios.$get('/api/v1/users').then(res => (users = res))
    const userKeys = Object.keys(users[0] || {}) // id, name, email, created_at
    return { users, userKeys }
  }
})
</script>
