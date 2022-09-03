<template>
  <v-card
    class="mx-auto my-4"
    min-width="300"
    max-width="600"
    @click="moveUserPage"
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
    <!-- グラフ -->
    <v-container>
      <v-row>
        <v-col>
        <v-card-text>
          <span>
            今月泳いだ距離
          </span>
          <v-divider />
        </v-card-text>
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="cyan lighten-2"
          max-width="calc(100% - 32px)"
        >
          <v-sparkline
            :labels="labels"
            :value="value"
            color="white"
            line-width="2"
            padding="16"
          />
        </v-sheet>
        </v-col>
      </v-row>
    </v-container>
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
  data ({ $store }) {
    return {
      user_id: this.user.id,
      current_id: $store.state.user.current.id,
      labels: [
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm'
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240
      ]
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
    moveUserPage () {
      this.$router.push(`/users/${this.user_id}`)
    },
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
