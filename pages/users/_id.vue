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
                  outlined
                  rounded
                  text
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
            20 フォロー
          </v-card-text>
          <v-card-text>
            10 フォロワー
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
      <div>
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
    })
  },
  methods: {
    ...mapActions({
      getUser: 'modules/user/getUser',
      emitSetUserClear: 'modules/user/emitSetUserClear'
    })
  },
  created () {
    this.getUser(this.user_id)
  },
  destroyed () {
    this.emitSetUserClear(this.user_id)
  }
}
</script>
