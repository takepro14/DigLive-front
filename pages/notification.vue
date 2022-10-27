<template>
  <v-container class="pb-16">
    <Toaster />
    <v-row class="pb-16">
      <v-col>
        <HistoryBack class="pb-4" />
          <v-card
            width="100%"
            class="mx-auto mb-8"
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
            <!-- <v-list v-if="isLoading">
              <template v-for="(n, index) in 10">
                <div :key="`notiLoader-${index}`">
                  <LoaderTypeCard />
                </div>
              </template>
            </v-list> -->
            <v-list three-line>
              <template v-for="(notification, index) in notifications">
                <div :key="`notification-${index}.id`">
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img
                        @click.stop="movePage(notification.notiLink)"
                        :src="notification.visitor.avatar.url"
                      />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <!-- フォロー通知 -->
                      <div
                        v-if="notification.action === 'follow'"
                        @click.stop="movePage(notification.notiLink)"
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
                        @click.stop="movePage(notification.notiLink)"
                      >
                        <v-list-item-title
                          class="my-4 wrap-text"
                          :class="isChecked(notification)"
                        >
                          {{ notification.notiVisitor }} {{ notification.notiAction }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="my-4 wrap-text">
                          > {{ notification.notiPost }}
                        </v-list-item-subtitle>
                      </div>
                      <!-- /いいね通知 -->
                      <!-- コメント通知 -->
                      <div
                        v-else-if="notification.action === 'comment'"
                        @click.stop="movePage(notification.notiLink)"
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
                          > {{ notification.notiPost }}
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
          <VueInfiniteLoading
            ref="infiniteLoading"
            spinner="spiral"
            @infinite="infiniteHandler"
          >
            <span slot="no-more">----- 通知は以上です -----</span>
            <span slot="no-results">----- 通知は以上です -----</span>
          </VueInfiniteLoading>
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
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'modules/user/currentUser',
      notificationsPage: 'notificationsPage',
      notifications: 'notifications'
    }),
    isChecked () {
      return (notificationObj) => {
        return !notificationObj.checked ? 'font-weight-bold' : ''
      }
    }
  },
  methods: {
    ...mapActions({
      getNotificationsPage: 'getNotificationsPage',
      getNotifications: 'getNotifications'
    }),
    movePage (fullPath) {
      this.$router.push(fullPath)
    },
    async infiniteHandler ($state) {
      if (!this.notifications.length) {
        this.isLoading = true
      }
      await this.$axios.$get('api/v1/notifications/', {
        params: {
          page: this.notificationsPage
        }
      })
        .then((data) => {
          setTimeout(() => {
            if (this.notificationsPage <= data.kaminari.pagination.pages) {
              this.getNotificationsPage()
              this.getNotifications(data.notifications)
              $state.loaded()
              this.isLoading = false
            } else {
              $state.complete()
              this.isLoading = false
            }
          }, 1000)
        })
        .catch(() => {
          $state.complete()
        })
    }
  },
  async fetch ({ store }) {
    await store.dispatch('modules/user/getCurrentUser')
  },
  destroyed () {
    // 通知ページからログアウトした場合にcurrentUserがnullになるため回避対応
    // (通知ページから遷移しない限り読み切ったと見做さない)
    if (Object.keys(this.currentUser).length) {
      this.$store.dispatch('getNotificationsChecked')
    }
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
