<template>
  <v-container>
    <v-icon
      x-large
      @click="historyBack"
    >
      mdi-keyboard-backspace
    </v-icon>
    <v-row>
      <v-col>
        <User
          :user="user"
          :currentUser="currentUser"
          @followEvent="follow"
          @unfollowEvent="unfollow"
          @changeProfileEvent="changeProfile"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
      >
        <v-toolbar
          color="subheader"
          dark
          flat
        >
          <v-toolbar-title
            class="mx-auto"
          >
            {{ user.name }} さんのアクティビティ
          </v-toolbar-title>
          <template v-slot:extension>
            <v-tabs
              centered
              slider-color="yellow"
              grow
            >
              <v-tab
                v-for="tab in tabs"
                :key="tab.id"
                @click="tabClick(tab.name)"
              >
                {{ tab.title }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <div
          v-if="menu === 'postsTab'"
        >
          <Post
            v-for="post in user.posts"
            :key="post.id"
            :post="post"
          />
        </div>
        <div
          v-if="menu === 'likesTab'"
        >
          <Post
            v-for="post in likedPosts"
            :key="post.id"
            :post="post"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'logged-in',
  data () {
    return {
      menu: 'postsTab',
      tabs: [
        {
          title: '投稿',
          name: 'postsTab'
        },
        {
          title: 'いいね',
          name: 'likesTab'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'modules/user/user',
      currentUser: 'modules/user/currentUser'
    }),
    likedPosts () {
      return this.user.likes.map((like) => {
        return like.post
      })
    }
  },
  methods: {
    ...mapActions({
      emitSetUserClear: 'modules/user/emitSetUserClear',
      follow: 'modules/user/follow',
      unfollow: 'modules/user/unfollow',
      changeProfile: 'modules/user/changeProfile'
    }),
    historyBack () {
      this.$router.go(-1)
    },
    tabClick (tabName) {
      this.menu = tabName
    }
  },
  async fetch ({ $axios, params, store }) {
    await $axios.$get(`/api/v1/users/${params.id}`)
      .then((user) => {
        store.dispatch('modules/user/emitSetUser', user)
      })
      .then(() => {
        store.dispatch('modules/user/getCurrentUser')
      })
  },
  destroyed () {
    this.emitSetUserClear(this.user_id)
  }
}
</script>
