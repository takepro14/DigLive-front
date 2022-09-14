<template>
  <v-container>
    <Toaster />
    <v-row>
      <v-col>
      <v-card
          width="100%"
          class="mx-auto"
        >
          <v-toolbar
            color="subheader"
            dark
            flat
          >
            <v-toolbar-title>
              通知一覧
            </v-toolbar-title>
            <v-spacer></v-spacer>

          </v-toolbar>

          <v-list
            three-line
          >
            <template
              v-for="notification in notifications"
            >
              <div
                :key="notification.id"
              >
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img
                      :src="'http://localhost:3000' + notification.visitor.avatar.url"
                    />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <div v-if="notification.action === 'follow'">
                      <v-list-item-title>
                        {{ notification.notiVisitor }} {{ notification.notiAction }}
                      </v-list-item-title>
                    </div>
                    <div v-else-if="notification.action === 'like'">
                      <v-list-item-title>
                        {{ notification.notiVisitor }} {{ notification.notiAction }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ notification.post.content }}
                      </v-list-item-subtitle>
                    </div>
                    <div v-else-if="notification.action === 'comment'">
                      <v-list-item-title>
                        {{ notification.notiVisitor }} {{ notification.notiAction }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ notification.comment.comment }}
                        {{ notification.post.content }}
                      </v-list-item-subtitle>
                    </div>
                  </v-list-item-content>
                </v-list-item>
                <v-divider />
              </div>
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
        notiObjs.forEach((notiObj) => {
          switch (notiObj.action) {
            case ('follow'):
              notiObj.notiVisitor = `${notiObj.visitor.name} さんが`
              notiObj.notiAction = 'あなたをフォローしました'
              notiObj.notiVisitorLink = `/users/${notiObj.visitor.id}`
              notiObj.notiTime = $moment(notiObj.created_at).format('YYYY年MM月DD日 HH時mm分')
              break
            case ('like'):
              notiObj.notiVisitor = `${notiObj.visitor.name} さんが`
              notiObj.notiAction = 'あなたの投稿にいいねしました'
              notiObj.notiPostLink = `/posts/${notiObj.post.id}`
              notiObj.notiTime = $moment(notiObj.created_at).format('YYYY年MM月DD日 HH時mm分')
              break
            case ('comment'):
              notiObj.notiVisitor = `${notiObj.visitor.name} さんが`
              notiObj.notiAction = 'あなたの投稿にコメントしました'
              notiObj.notiPostLink = `/posts/${notiObj.post.id}`
              notiObj.notiTime = $moment(notiObj.created_at).format('YYYY年MM月DD日 HH時mm分')
              break
          }
        })
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
