<template>
  <v-card
    class="mx-auto my-4"
    width="100%"
    hover
    @click="movePostPage"
  >
    <v-container>
      <v-row>
        <v-list-item
          class="grow"
          @click.stop="moveUserPage"
        >
          <v-list-item-avatar>
            <v-img
              class="elevation-6"
              alt=""
              :src="'http://localhost:3000' + post.user.avatar.url"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <!-- 投稿一覧ページでの表示 -->
            <v-list-item-title
              v-if="$route.fullPath === '/home'"
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
          <PostDestroyDialog
            v-if="isMyPost"
            :post="post"
            @destroyPostEvent="destroyPost(post.id)"
          />
        </v-list-item>
      </v-row>

      <!-- YouTube -->
      <v-row
        v-if="hasYoutubeUrl"
        justify="center"
      >
        <v-col
          cols="10"
        >
          <!-- <YouTube
            :youtube_url="post.youtube_url"
          /> -->
        </v-col>
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
          <v-card-text
            v-if="$route.fullPath !== '/home'"
            class="mr-3"
          >
            {{ $my.format(post.created_at) }}
          </v-card-text>
          <v-icon
            v-if="post.isLiked"
            class="mr-1"
            large
            @click.stop="unLikePost(post)"
          >
            mdi-heart
          </v-icon>
          <v-icon
            v-else
            class="mr-1"
            large
            @click.stop="likePost(post)"
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
    </v-container>
  </v-card>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Post',
  filters: {
    moment (date) {
      moment.locale('ja')
      return moment(date).fromNow()
    }
  },
  props: {
    post: {
      type: Object
    },
    currentUserId: {
      type: Number
    }
  },
  computed: {
    commentLength () {
      return !this.post.comments ? 0 : this.post.comments.length
    },
    likeLength () {
      return !this.post.likes ? 0 : this.post.likes.length
    },
    isMyPost () {
      return this.post.user_id === this.currentUserId
    },
    hasYoutubeUrl () {
      return !!this.post.youtube_url
    }
  },
  methods: {
    destroyPost (postId) {
      this.$emit('destroyPostEvent', postId)
    },
    likePost (postObj) {
      this.$emit('likePostEvent', postObj)
    },
    unLikePost (postObj) {
      this.$emit('unLikePostEvent', postObj)
    },
    movePostPage () {
      this.$router.push(`/posts/${this.post.id}`)
    },
    moveUserPage () {
      this.$router.push(`/users/${this.post.user_id}`)
    }
  }
}
</script>
