<template>
  <v-card
    class="mx-auto my-4"
    width="100%"
    @click="moveUserPage"
  >
    <Toaster />
    <v-list-item
      three-line
    >
      <v-list-item-content>
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
            <!-- カレントユーザの表示 -->
            <UserEditDialog
              v-if="isCurrentUser"
              @changeProfileEvent="changeProfile"
              :currentUser="currentUser"
            >
              プロフィール設定
            </UserEditDialog>
            <!-- 他ユーザの表示 -->
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
          {{ user.profile }}
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
    },
    currentUser: {
      type: Object
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
    follow () {
      this.$emit('followEvent', this.user.id)
    },
    unfollow () {
      this.$emit('unfollowEvent', this.user.id)
    }
  }
}
</script>
