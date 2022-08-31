<template>
  <v-container>
    <v-row>
      <!-- プロフィール領域 -->
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
                v-if="user.id === current_id"
              >
                MY PAGE
              </span>
              <span
                v-else
              >
                PROFILE
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
                  v-if="user.id === current_id"
                  @submit="addImage"
                >
                  プロフィール設定
                </UserEditDialog>
                <v-btn
                  v-else-if="user.isFollowed === true"
                  outlined
                  rounded
                  text
                  @click="unfollow(user.id)"
                >
                  フォロー中
                </v-btn>
                <v-btn
                  v-else-if="user.isFollowed === false"
                  outlined
                  rounded
                  @click="follow(user.id)"
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
              :src="'http://localhost:3000' + user.avatar.url"
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
    </v-row>
    <!-- アクティビティ領域 -->
    <v-row
      class="text-center"
    >
      <v-col>
        <div>
          {{ user.name }} さんの投稿
        </div>
      </v-col>
    </v-row>
    <v-row>
      <div
        class="mx-auto"
      >
        <Post
          v-for="post in user.posts"
          :key="post.id"
          :post="post"
        />
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'logged-in',
  data ({ $route, $store }) {
    return {
      user_id: $route.params.id,
      current_id: $store.state.user.current.id
    }
  },
  computed: {
    ...mapGetters({
      user: 'modules/user/user'
    }),
    followerLength () {
      return !this.user.passive_relationships ? 0 : this.user.passive_relationships.length
    },
    followingLength () {
      return !this.user.active_relationships ? 0 : this.user.active_relationships.length
    },
    avatarUrl () {
      return require(this.user.avatar.url)
    }
  },
  methods: {
    ...mapActions({
      // getUser: 'modules/user/getUser',
      emitSetUserClear: 'modules/user/emitSetUserClear',
      follow: 'modules/user/follow',
      unfollow: 'modules/user/unfollow',
      setAvatar: 'modules/user/setAvatar'
    }),
    // 画像アップロード
    async addImage (formData, config) {
      await this.$axios.$put(`/api/v1/users/${this.current_id}`, formData, config)
        // .then((user) => {
        //   console.log(JSON.stringify(user))
        //   return user
        // })
        .then((user) => {
          this.setAvatar(user)
        })
    }
  },
  async fetch ({ $axios, params, store }) {
    await $axios.$get(`/api/v1/users/${params.id}`)
      .then((user) => {
        // console.log(JSON.stringify(user))
        store.dispatch('modules/user/emitSetUser', user)
      })
  },
  destroyed () {
    this.emitSetUserClear(this.user_id)
  }
}
</script>
