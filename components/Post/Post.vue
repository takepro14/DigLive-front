<template>
  <v-card
    class="mx-auto my-4"
    min-width="300"
    max-width="600"
    :to="`/posts/${post.id}`"
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
            {{ post.user }}
          </v-list-item-title>
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
            class="mr-1"
            @click="likePost(post)"
          >
            mdi-heart
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
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    post: {
      type: Object
    }
  },
  computed: {
    commentLength () {
      return !this.post.comments ? 0 : this.post.comments.length
    },
    likeLength () {
      return !this.post.likes ? 0 : this.post.likes.length
    }
  },
  methods: {
    ...mapActions({
      likePost: 'modules/post/likePost'
    })
  }
}
</script>
