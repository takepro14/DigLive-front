<template>
  <v-card
    class="px-2 card-outter"
    width="100%"
    height="100%"
    hover
    @click="moveUserPage"
  >
    <v-container>
      <!-- ヘッダー -->
      <v-row
        class="my-2 text-left"
        align="center"
      >
        <v-col
          cols="12"
          sm="12"
          md="8"
          lg="8"
          xl="8"
          class="text-center"
        >
        <v-list-item>
          <v-list-item-subtitle
            class="font-weight-bold text-left wrap-text"
            :class="isUserPage($route.fullPath)"
          >
            {{ user.name }}
          </v-list-item-subtitle>
        </v-list-item>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="2"
          lg="2"
          xl="2"
          class="text-center"
        >
          <v-avatar
            size="100"
            tile
          >
            <v-img :src="avatarUrl" />
          </v-avatar>
        </v-col>
      </v-row>
      <!-- /ヘッダー -->
      <!-- フォローフラグ・設定 -->
      <v-row>
        <v-col class="d-flex justify-end">
          <div v-if="isCurrentUser">
            <v-btn
              outlined
              rounded
              small
              text
              @click.stop="moveSettingsPage"
            >
              設定
            </v-btn>
          </div>
          <div v-else>
            <div v-if="isFollowed">
              <v-btn
                outlined
                rounded
                small
                text
                @click.stop="unfollow({ userId: user.id, route: $route.fullPath })"
              >
                フォロー中
              </v-btn>
            </div>
            <div v-else-if="!isFollowed">
              <v-btn
                outlined
                rounded
                small
                color="blue"
                @click.stop="follow({ userId: user.id, route: $route.fullPath })"
              >
                フォローする
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <!-- /フォローフラグ・設定 -->
      <!-- プロフィール -->
      <v-row>
        <v-col>
          <v-list-item-subtitle class="wrap-text">
            {{ user.profile }}
          </v-list-item-subtitle>
        </v-col>
      </v-row>
      <!-- /プロフィール -->
      <v-row>
        <v-col>
          <v-chip-group
            column
            multiple
          >
            <Genre
              v-for="genre in user.genres"
              :key="genre.genre_name"
              :genre="genre"
            />
          </v-chip-group>
        </v-col>
      </v-row>
      <!-- フッター -->
      <v-row>
        <v-col class="d-flex justify-end">
          <div>
            <v-card-text>
              {{ followingLength }} フォロー
            </v-card-text>
          </div>
          <div>
            <v-card-text class="ml-2">
              {{ followerLength }} フォロワー
            </v-card-text>
          </div>
        </v-col>
      </v-row>
      <!-- /フッター -->
    </v-container>
  </v-card>
</template>

<script>
export default {
  layout: 'logged-in',
  props: {
    user: {
      type: Object
    },
    currentUser: {
      type: Object
    },
    genres: {
      type: Array
    }
  },
  computed: {
    isCurrentUser () {
      return this.user.id === this.currentUser.id
    },
    isFollowed () {
      return this.user.isFollowed
    },
    followerLength () {
      return !this.user.passive_relationships ? 0 : this.user.passive_relationships.length
    },
    followingLength () {
      return !this.user.active_relationships ? 0 : this.user.active_relationships.length
    },
    isUserPage () {
      return (routeFullPath) => {
        return routeFullPath.includes('users') ? 'text-h6' : ''
      }
    },
    avatarUrl () {
      return this.user.avatar.url || require('@/static/image/default.png')
    }
  },
  methods: {
    moveUserPage () {
      this.$router.push(`/users/${this.user.id}`)
    },
    moveSettingsPage () {
      this.$router.push('/settings')
    },
    follow (userIdRoute) {
      this.$emit('followEvent', userIdRoute)
    },
    unfollow (userIdRoute) {
      this.$emit('unfollowEvent', userIdRoute)
    }
  }
}
</script>

<style scoped>
/* テキストを省略せず折り返し */
.wrap-text {
  word-break: break-all;
  white-space: normal;
}
/* フッターを最下部に固定 */
.card-outter {
  position: relative;
}
.card-actions {
  position: absolute;
  bottom: 15px;
  right: 15px;
}
</style>
