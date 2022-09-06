<template>
  <v-container>
    <!--
      ユーザプロフィール
    -->
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
          @followEvent="follow"
          @unfollowEvent="unfollow"
          @changeAvatarEvent="changeAvatar"
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
          <v-toolbar-title>
            {{ user.name }} さんの投稿
          </v-toolbar-title>
        </v-toolbar>
        <Post
          v-for="post in user.posts"
          :key="post.id"
          :post="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'logged-in',
  computed: {
    ...mapGetters({
      user: 'modules/user/user'
    })
  },
  methods: {
    ...mapActions({
      getUser: 'modules/user/getUser',
      emitSetUserClear: 'modules/user/emitSetUserClear',
      follow: 'modules/user/follow',
      unfollow: 'modules/user/unfollow',
      changeAvatar: 'modules/user/changeAvatar'
    }),
    historyBack () {
      this.$router.go(-1)
    }
  },
  async fetch ({ $axios, params, store }) {
    await $axios.$get(`/api/v1/users/${params.id}`)
      .then((user) => {
        store.dispatch('modules/user/emitSetUser', user)
      })
  },
  destroyed () {
    this.emitSetUserClear(this.user_id)
  }
}
</script>
