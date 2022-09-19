<template>
  <v-card
    class="mx-auto px-10"
    width="100%"
    height="100%"
    @click="moveUserPage"
  >
    <Toaster />
    <v-container>
      <v-row
        align="center"
        class="py-2"
      >
        <v-col class="text-center">
          <v-list-item-title class="text-h5" >
            {{ user.name }}
          </v-list-item-title>
        </v-col>
        <v-spacer />
        <v-spacer />
        <v-col class="text-center">
          <v-avatar
            size="100"
            tile
          >
            <v-img :src="avatarUrl" />
          </v-avatar>
        </v-col>
      </v-row>
      <v-row class="py-2" >
        <v-spacer />
        <div v-if="!isCurrentUser">
          <div v-if="isFollowedTrue">
            <v-btn
              outlined
              rounded
              text
              @click.stop="unfollow({ userId: user.id, route: $route.fullPath })"
            >
              フォロー中
            </v-btn>
          </div>
          <div v-else-if="isFollowedFalse">
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
      <v-row class="py-2">
        <v-list-item-subtitle>
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
      <v-row
        class="py-2 d-flex"
        align="center"
        justify="end"
      >
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
