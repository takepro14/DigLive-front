<template>
  <v-container>
    <Toaster />
    <v-row>
      <v-col>
        <HistoryBack class="py-4" />
          <v-card
            width="100%"
            class="mx-auto"
          >
            <v-toolbar
              color="header"
              dark
              flat
            >
              <v-toolbar-title>
                通知一覧
              </v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-list three-line>
              <template v-for="notification in notifications">
                <div :key="notification.id">
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img
                        @click.stop="moveUserPage(notification.visitor.id)"
                        :src="'http://localhost:3000' + notification.visitor.avatar.url"
                      />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <!-- フォロー通知 -->
                      <div
                        v-if="notification.action === 'follow'"
                        @click.stop="moveUserPage(notification.visitor.id)"
                      >
                        <v-list-item-title
                          class="wrap-text"
                          :class="isChecked(notification)"
                        >
                          {{ notification.notiVisitor }} {{ notification.notiAction }}
                        </v-list-item-title>
                      </div>
                      <!-- /フォロー通知 -->
                      <!-- いいね通知 -->
                      <div
                        v-else-if="notification.action === 'like'"
                        @click.stop="movePostPage(notification.post.id)"
                      >
                        <v-list-item-title
                          class="my-4 wrap-text"
                          :class="isChecked(notification)"
                        >
                          {{ notification.notiVisitor }} {{ notification.notiAction }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="my-4 wrap-text">
                          > {{ notification.notiPostContent }}
                        </v-list-item-subtitle>
                      </div>
                      <!-- /いいね通知 -->
                      <!-- コメント通知 -->
                      <div
                        v-else-if="notification.action === 'comment'"
                        @click.stop="movePostPage(notification.post.id)"
                      >
                        <v-list-item-title
                          class="my-4 wrap-text"
                          :class="isChecked(notification)"
                        >
                          {{ notification.notiVisitor }} {{ notification.notiAction }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="my-4 wrap-text">
                          {{ notification.notiComment }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle class="my-4 wrap-text">
                          > {{ notification.notiPostContent }}
                        </v-list-item-subtitle>
                      </div>
                      <!-- /コメント通知 -->
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
import { mapGetters } from 'vuex'
export default {
  layout: 'logged-in',
  middleware: [
    'authentication'
  ],
  computed: {
    ...mapGetters({
      currentUser: 'modules/user/currentUser',
      notifications: 'notifications'
    }),
    isChecked () {
      return (notificationObj) => {
        return !notificationObj.checked ? 'font-weight-bold' : ''
      }
    }
  },
  methods: {
    moveUserPage (visitorId) {
      this.$router.push(`/users/${visitorId}`)
    },
    movePostPage (postId) {
      this.$router.push(`/posts/${postId}`)
    }
  },
  async fetch ({ store }) {
    await store.dispatch('modules/user/getCurrentUser')
      .then(() => {
        store.dispatch('getNotifications')
      })
  },
  destroyed () {
    this.$store.dispatch('getNotificationsChecked')
  }
}
</script>

<style>
/* テキストを省略せず折り返し */
.wrap-text {
  word-break: break-all;
  white-space: normal;
}
</style>
