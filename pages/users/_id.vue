<template>
  <v-container>
    <!--
      ユーザプロフィール
    -->
    <User
      :user="user"
      @followEvent="follow"
      @unfollowEvent="unfollow"
      @changeAvatarEvent="changeAvatar"
    />
    <!--
      サイドメニュー
    -->
    <!-- <SideMenu
    /> -->
    <!--
      ユーザの投稿一覧
    -->
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
      <v-col>
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
    })
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
