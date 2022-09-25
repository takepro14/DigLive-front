<template>
  <v-card
    class="mx-auto px-10 py-5 card-outter"
    width="100%"
    height="100%"
    @click="moveUserPage"
  >
    <Toaster />
    <v-container>
      <!-- ヘッダー -->
      <v-row
        class="text-left"
        align="center"
      >
        <v-col
          cols="12"
          sm="12"
          md="9"
          lg="9"
          xl="9"
          class="text-center"
        >
          <v-list-item-title class="text-h5 text-left wrap-text" >
            {{ user.name }}
          </v-list-item-title>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="3"
          lg="3"
          xl="3"
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
      <!-- フォローフラグ・編集 -->
      <v-row class="py-2" >
        <v-spacer />
        <div v-if="isCurrentUser">
            <v-btn
              outlined
              rounded
              text
              @click.stop="moveSettingsPage"
            >
              編集
            </v-btn>
        </div>
        <div v-else>
          <div v-if="isFollowed">
            <v-btn
              outlined
              rounded
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
              color="blue"
              @click.stop="follow({ userId: user.id, route: $route.fullPath })"
            >
              フォローする
            </v-btn>
          </div>
        </div>
      </v-row>
      <!-- /フォローフラグ・編集 -->
      <!-- プロフィール -->
      <v-row class="py-6">
        <v-list-item-subtitle class="wrap-text">
          {{ user.profile }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <v-chip-group
            column
            multiple
            class="my-4"
          >
            <Genre
              v-for="genre in user.genres"
              :key="genre.genre_name"
              :genre="genre"
            />
          </v-chip-group>
        </v-list-item-subtitle>
      </v-row>
      <!-- /プロフィール -->
      <!-- フッター -->
      <v-row class="card-actions">
        <div class="ml-3 mr-1">
          <v-card-text>
            {{ followingLength }} フォロー
          </v-card-text>
        </div>
        <div class="ml-3 mr-1">
          <v-card-text>
            {{ followerLength }} フォロワー
          </v-card-text>
        </div>
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
    avatarUrl () {
      return 'http://localhost:3000' + this.user.avatar.url
    }
  },
  methods: {
    moveUserPage () {
      this.$router.push(`/users/${this.user.id}`)
    },
    moveSettingsPage () {
      this.$router.push('/account/settings')
    },
    changeProfile ({ formData, config }) {
      this.$emit('changeProfileEvent', { formData, config })
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
