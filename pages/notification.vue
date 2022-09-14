<template>
  <v-container>
    <Toaster />
    <v-row>
      <v-col>
      <v-card
          max-width="450"
          class="mx-auto"
        >
          <v-toolbar
            color="cyan"
            dark
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Inbox</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list three-line>
            <template v-for="(item, index) in items">
              <v-subheader
                v-if="item.header"
                :key="item.header"
                v-text="item.header"
              ></v-subheader>

              <v-divider
                v-else-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-item
                v-else
                :key="item.title"
              >
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'logged-in',
  middleware: [
    'authentication'
  ],
  data () {
    return {
      notifications: []
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'modules/user/currentUser'
    })
  },
  methods: {
    ...mapActions({
      getCurrentUser: 'modules/user/getCurrentUser'
    })
  },
  async asyncData ({ $axios, $moment }) {
    return await $axios.$get('api/v1/notifications/')
      .then((notiObjs) => {
        console.log('notiObjs: ' + JSON.stringify(notiObjs))
        notiObjs.forEach((notiObj) => {
          switch (notiObj.action) {
            case ('like'):
              notiObj.visitor = `${notiObj.visitor.name} さんが`
              notiObj.action = 'あなたの投稿にいいねしました'
              // notiObj.link = `/posts/${notiObj.post.id}`
              notiObj.time = $moment(notiObj.created_at).format('YYYY年MM月DD日 HH時mm分')
              break
            case ('comment'):
              notiObj.visitor = `${notiObj.visitor.name} さんが`
              notiObj.action = 'あなたの投稿にコメントしました'
              // notiObj.link = `/posts/${notiObj.post.id}`
              notiObj.time = $moment(notiObj.created_at).format('YYYY年MM月DD日 HH時mm分')
              break
            case ('follow'):
              notiObj.visitor = `${notiObj.visitor.name} さんが`
              notiObj.action = 'あなたをフォローしました'
              // notiObj.link = `/users/${notiObj.visitor.id}`
              notiObj.time = $moment(notiObj.created_at).format('YYYY年MM月DD日 HH時mm分')
              break
          }
        })
        console.log('notiObjs: ' + JSON.stringify(notiObjs))
        return {
          notifications: notiObjs
        }
      })
  },
  async fetch () {
    await this.getCurrentUser()
  }
}
</script>
