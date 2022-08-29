<template>
  <v-card
    class="mx-auto my-4"
    min-width="300"
    max-width="600"
    @click="movePostPage"
  >
    <v-card-text
      class="font-weight-bold"
    >
      {{ post.content }}
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
      <v-list-item
        class="grow"
      >
        <v-list-item-avatar
          color="grey darken-3"
          @click.stop="moveUserPage"
        >
          <v-img
            class="elevation-6"
            alt=""
            src="https://i.pravatar.cc/10"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <!-- {{ post.user }} -->
            {{ post.user.name }}
          </v-list-item-title>
          <v-list-item-content>
            <!-- {{ $my.format(post.created_at) }} -->
            {{ post.created_at }}
          </v-list-item-content>
        </v-list-item-content>
        <v-row
          align="center"
          justify="end"
        >
          <PostDestroyDialog
            :post="post"
            class="mr-3"
          />
          <v-icon
            v-if="post.isLiked"
            class="mr-1"
            @click.stop="unLikePost(post)"
          >
            mdi-heart
          </v-icon>
          <v-icon
            v-else
            class="mr-1"
            @click.stop="likePost(post)"
          >
            mdi-heart-outline
          </v-icon>
          <span
            class="subheading mr-2"
          >
            {{ likeLength }}
          </span>
          <v-icon
            class="ml-3 mr-1"
          >
            mdi-comment-processing-outline
          </v-icon>
          <span
            class="subheading"
          >
            {{ commentLength }}
          </span>
        </v-row>
      </v-list-item>
    </v-card-actions>
    <!-- コンポーネントのpost: {{ post }}
    stateのpost: {{ statePost }} -->
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
  }
}
</script>
