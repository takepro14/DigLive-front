<template>
  <v-card
    class="mx-auto px-10"
    width="100%"
    @click="moveUserPage"
  >
    <Toaster />
    <v-row
      align="center"
      class="py-2"
    >
      <!--
        ユーザ名
      -->
      <v-col
        class="text-center"
      >
        <v-list-item-title
          class="text-h5"
        >
          {{ user.name }}
        </v-list-item-title>
      </v-col>
      <v-spacer />
      <v-spacer />
      <!--
        アバター
      -->
      <v-col class="text-center">
        <v-avatar
          size="100"
          tile
        >
          <v-img
            :src="avatarUrl"
          />
        </v-avatar>
      </v-col>
    </v-row>
    <v-row
      class="py-2"
    >
      <v-spacer />
      <!--
        フォローステータス
      -->
      <!-- 自分以外 -->
      <div
        v-if="!isCurrentUser"
      >
        <!-- フォロー中 -->
        <v-btn
          v-if="isFollowedTrue"
          outlined
          rounded
          text
          @click.stop="unfollow({ userId: user.id, route: $route.fullPath })"
        >
          フォロー中
        </v-btn>
        <!-- 未フォロー -->
        <v-btn
          v-else-if="isFollowedFalse"
          outlined
          rounded
          color="blue"
          @click.stop="follow({ userId: user.id, route: $route.fullPath })"
        >
          フォローする
        </v-btn>
      </div>
    </v-row>
    <!--
      ユーザプロフィール
    -->
    <v-row
      class="py-2"
    >
      <!-- プロフィール -->
      <v-list-item-subtitle>
        {{ user.profile }}
      </v-list-item-subtitle>
      <!-- ジャンル -->
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
    <!--
      フォロー・フォロワー数
    -->
    <v-row
      class="py-2"
    >
    <v-spacer />
    <v-spacer />
      <v-col>
          {{ followingLength }} フォロー
      </v-col>
      <v-col>
          {{ followerLength }} フォロワー
      </v-col>
    </v-row>
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
    isFollowedTrue () {
      return this.user.isFollowed === true
    },
    isFollowedFalse () {
      return this.user.isFollowed === false
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
    changeProfile ({ formData, config }) {
      this.$emit('changeProfileEvent', { formData, config })
    },
    follow (userIdAndRoute) {
      this.$emit('followEvent', userIdAndRoute)
    },
    unfollow (userIdAndRoute) {
      this.$emit('unfollowEvent', userIdAndRoute)
    }
  }
}
</script>
