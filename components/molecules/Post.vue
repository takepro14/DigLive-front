<template>
  <v-card
    class="mx-auto my-4"
    width="100%"
    height="100%"
    hover
    @click="movePostPage"
  >
    <v-container>
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
              <v-list-item-title v-if="$route.fullPath === '/home'">
                {{ post.user.name }}・{{ post.created_at | moment }}
              </v-list-item-title>
              <v-list-item-title v-else>
                {{ post.user.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-spacer />
            <v-list-item-icon>
              <PostDestroyDialog
                v-if="isMyPost"
                :post="post"
                @destroyPostEvent="destroyPost(post.id)"
              />
            </v-list-item-icon>
          </v-list-item>
        </v-col>
      </v-row>

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

      <v-row>
        <v-col>
          <v-card-text class="text-h5 py-8 flex-grow-1">
            <div class="text--primary">
              {{ post.content }}
            </div>
          </v-card-text>
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

      <v-row>
        <v-col>
          <v-card-actions>
            <v-row
              align="center"
              justify="end"
            >
              <!-- <div v-if="$route.fullPath !== '/home'"> -->
                <v-card-text class="ml-3 mr-1">
                  {{ $my.format(post.created_at) }}
                </v-card-text>
              <!-- </div> -->
              <div v-if="post.isLiked">
                <v-icon
                  class="ml-3 mr-1"
                  @click.stop="unLikePost(post)"
                  large
                >
                  mdi-heart
                </v-icon>
              </div>
              <div v-else>
                <v-icon
                  class="ml-3 mr-1"
                  large
                  @click.stop="likePost(post)"
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
    },
    userAvatar () {
      return 'http://localhost:3000' + this.post.user.avatar.url
    }
  },
  methods: {
    likePost (postObj) {
      this.$emit('likePostEvent', postObj)
    },
    unLikePost (postObj) {
      this.$emit('unLikePostEvent', postObj)
    },
    destroyPost (postId) {
      this.$emit('destroyPostEvent', postId)
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
