<template>
  <v-card
    class="mx-auto my-4 card-outter"
    width="100%"
    height="100%"
    hover
    @click="movePostPage"
  >
    <v-container>
      <!-- ヘッダー -->
      <v-row>
        <v-col>
          <v-list-item
            class="grow"
            @click.stop="moveUserPage"
          >
            <v-list-item-avatar>
              <v-img
                class="elevation-6"
                alt=""
                :src="userAvatar"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                v-if="$route.fullPath === '/home'"
                class="wrap-text"
              >
                {{ post.user.name }}・{{ post.created_at | moment }}
              </v-list-item-title>
              <v-list-item-title
                v-else
              >
                {{ post.user.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <PostDestroyDialog
                v-if="isMyPost"
                :post="post"
                @destroyPostEvent="destroyPost"
              />
            </v-list-item-icon>
          </v-list-item>
        </v-col>
      </v-row>
      <!-- /ヘッダー -->
      <!-- YouTube -->
      <!-- <v-row
        v-if="hasYoutubeUrl"
        justify="center"
      >
        <v-col cols="10">
          <YouTube
            :youtube_url="post.youtube_url"
          />
        </v-col>
      </v-row> -->
      <!-- /YouTube -->
      <!-- 本文・ジャンル -->
      <v-row>
        <v-col>
          <v-card-title>
            <div class="text--primary">
              {{ post.content }}
            </div>
          </v-card-title>
          <div class="px-4">
            <v-chip-group
              active-class="primary--text"
              column
            >
              <v-chip
                v-for="genre in post.genres"
                :key="genre.genre_name"
                label
                link
                color="genre"
              >
                {{ genre.genre_name }}
              </v-chip>
              <v-chip
                v-for="tag in post.tags"
                :key="tag.tag_name"
                link
                color="tag"
              >
                {{ tag.tag_name }}
              </v-chip>
            </v-chip-group>
          </div>
        </v-col>
      </v-row>
      <!-- /本文・ジャンル -->
      <!-- フッター -->
      <v-row class="my-4">
        <v-col>
          <v-card-actions class="card-actions">
            <v-row
              align="center"
              justify="end"
            >
              <div v-if="$route.fullPath !== '/home'">
                <v-card-text class="ml-3 mr-1">
                  {{ $my.format(post.created_at) }}
                </v-card-text>
              </div>
              <div v-if="post.isLiked">
                <v-icon
                  class="ml-3 mr-1"
                  large
                  @click.stop="unLikePost"
                >
                  mdi-heart
                </v-icon>
              </div>
              <div v-else>
                <v-icon
                  class="ml-3 mr-1"
                  large
                  @click.stop="likePost"
                >
                  mdi-heart-outline
                </v-icon>
              </div>
              <span class="subheading">
                {{ likeLength }}
              </span>
              <div>
                <v-icon
                  class="ml-3 mr-1"
                  large
                >
                  mdi-comment-processing-outline
                </v-icon>
              </div>
              <span class="subheading">
                {{ commentLength }}
              </span>
            </v-row>
          </v-card-actions>
        </v-col>
      </v-row>
      <!-- /フッター -->
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
      type: Object,
      default: () => ({})
    },
    currentUserId: {
      type: Number
    }
  },
  data ({ $config: { imageUrl } }) {
    return {
      imageUrl
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
    },
    userAvatar () {
      return this.imageUrl + this.post.user.avatar.url
    }
  },
  methods: {
    likePost () {
      this.$emit('likePostEvent', this.post)
    },
    unLikePost () {
      this.$emit('unLikePostEvent', this.post)
    },
    destroyPost () {
      this.$emit('destroyPostEvent', { postId: this.post.id, route: this.$route.fullPath })
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

<style scoped>
/* テキストを省略せず折り返し */
.wrap-text {
  word-break: break-all;
  white-space: normal;
}
/* フッターを最下部に固定 */
.card-outter {
  position: relative;
}
.card-actions {
  position: absolute;
  bottom: 15px;
  right: 15px;
}
</style>
