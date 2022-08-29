<template>
  <v-card
    class="mx-auto my-4"
    min-width="300"
    max-width="600"
    @click="movePostPage"
    shaped
  >
  <v-container>
    <v-row>
      <v-list-item
        class="grow"
        @click.stop="moveUserPage"
      >
        <v-list-item-avatar
          color="grey darken-3"
        >
          <v-img
            class="elevation-6"
            alt=""
            src="https://i.pravatar.cc/10"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <!-- 投稿一覧ページでの表示 -->
          <v-list-item-title
            v-if="$route.fullPath === '/posts'"
          >
            {{ post.user.name }}・{{ post.created_at | moment }}
          </v-list-item-title>
          <!-- 投稿詳細ページでの表示 -->
          <v-list-item-title
            v-else
          >
            {{ post.user.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-spacer />
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      </v-list-item>
    </v-row>
    <v-card-text
      class="text-h5 py-8"
    >
      <div
        class="text--primary"
      >
        {{ post.content }}
      </div>
    </v-card-text>
    <div
      class="px-4"
    >
      <v-chip-group
        active-class="primary--text"
        column
      >
        <v-chip
          v-for="tag in post.tags"
          :key="tag.id"
          link
        >
          # {{ tag.tag_name }}
        </v-chip>
      </v-chip-group>
    </div>
    <v-card-actions>
        <v-row
          align="center"
          justify="end"
        >
        <!-- TODO: 管理者モードにて表示する -->
          <!-- <PostDestroyDialog
            :post="post"
            class="mr-3"
          /> -->
          <v-card-content
            v-if="$route.fullPath !== '/posts'"
            class="mr-3"
          >
            {{ $my.format(post.created_at) }}
          </v-card-content>
          <v-icon
            v-if="post.isLiked"
            class="mr-1"
            @click.stop="unLikePost(post)"
            large
          >
            mdi-heart
          </v-icon>
          <v-icon
            v-else
            class="mr-1"
            @click.stop="likePost(post)"
            large
          >
            mdi-heart-outline
          </v-icon>
          <span
            class="subheading mr-2"
            large
          >
            {{ likeLength }}
          </span>
          <v-icon
            class="ml-3 mr-1"
            large
          >
            mdi-comment-processing-outline
          </v-icon>
          <span
            class="subheading"
          >
            {{ commentLength }}
          </span>
        </v-row>
    </v-card-actions>
    <!-- コンポーネントのpost: {{ post }}
    stateのpost: {{ statePost }} -->
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  props: {
    post: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      statePost: 'modules/post/post'
    }),
    commentLength () {
      return !this.post.comments ? 0 : this.post.comments.length
    },
    likeLength () {
      return !this.post.likes ? 0 : this.post.likes.length
    }
  },
  methods: {
    ...mapActions({
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost'
    }),
    movePostPage () {
      this.$router.push(`/posts/${this.post.id}`)
    },
    moveUserPage () {
      this.$router.push(`/users/${this.post.user_id}`)
    }
  },
  filters: {
    moment (date) {
      moment.locale('ja')
      return moment(date).fromNow()
    }
  }
}
</script>
