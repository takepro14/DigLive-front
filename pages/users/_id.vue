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
              PROFILE
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
                <v-btn
                  v-if="user.isFollowed === true"
                  outlined
                  rounded
                  text
                  @click="unfollow(user.id)"
                >
                  フォロー中
                </v-btn>
                <v-btn
                  v-else
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
            color="grey"
          ></v-list-item-avatar>
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
  data ({ $route }) {
    return {
      user_id: $route.params.id
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
    }
  },
  methods: {
    ...mapActions({
      // getUser: 'modules/user/getUser',
      emitSetUserClear: 'modules/user/emitSetUserClear',
      follow: 'modules/user/follow',
      unfollow: 'modules/user/unfollow'
    })
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
