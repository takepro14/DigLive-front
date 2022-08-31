<template>
  <v-card
    class="mx-auto"
    max-width="600"
    outlined
  >
    <v-list-item
      three-line
    >
      <v-list-item-content>
        <div
          class="text-overline mb-4"
        >
          <span
            v-if="isCurrentUser"
          >
            マイページ
          </span>
        </div>
        <v-row>
          <v-col>
            <v-list-item-title
              class="text-h5 mb-1"
            >
              {{ user.name }}
            </v-list-item-title>
          </v-col>
          <v-spacer />
          <v-col>
            <UserEditDialog
              v-if="isCurrentUser"
              @submit="setAvatar"
            >
              プロフィール設定
            </UserEditDialog>
            <v-btn
              v-else-if="isFollowedTrue"
              outlined
              rounded
              text
              @click="unfollow"
            >
              フォロー中
            </v-btn>
            <v-btn
              v-else-if="isFollowedFalse"
              outlined
              rounded
              @click="follow"
              color="blue"
            >
              フォローする
            </v-btn>
          </v-col>
        </v-row>
        <v-list-item-subtitle>
          美容師の経験を活かして、メンズ美容について色々発信していきます！
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar
        tile
        size="120"
      >
        <v-img
          :src="avatarUrl"
        />
      </v-list-item-avatar>
    </v-list-item>
    <v-card-actions>
      <v-card-text>
        {{ followingLength }} フォロー
      </v-card-text>
      <v-card-text>
        {{ followerLength }} フォロワー
      </v-card-text>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: 'logged-in',
  props: {
    user: {
      type: Object
    }
  },
  data ({ $route, $store }) {
    return {
      user_id: $route.params.id,
      current_id: $store.state.user.current.id
    }
  },
  computed: {
    isCurrentUser () {
      return this.user.id === this.current_id
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
    async setAvatar (formData, config) {
      await this.$axios.$put(`/api/v1/users/${this.current_id}`, formData, config)
        .then((user) => {
          this.$emit('setAvatarEvent', user)
        })
    },
    follow () {
      this.$emit('followEvent', this.user.id)
    },
    unfollow () {
      this.$emit('unfollowEvent', this.user.id)
    }
  }
}
</script>
