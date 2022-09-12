<template>
  <v-timeline
    align-top
    dense
    style="max-width: 600px"
    class="mx-auto mt-6"
  >
    <v-timeline-item
      large
    >
      <template #icon>
        <v-avatar>
          <img
            :src="avatarUrl"
          >
        </v-avatar>
      </template>
      <v-card
        class="elevation-2"
        width="100%"
      >
        <v-card-text>
          <v-row>
            <v-col>
              {{ comment.user.name }}
            </v-col>
            <v-spacer />
            <v-col>
              <CommentDestroyDialog
                v-if="isMyComment"
                :comment="comment"
                @destroyCommentEvent="destroyComment(comment.id)"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-title>
          {{ comment.comment }}
        </v-card-title>
        <v-card-actions>
          <v-row>
            <v-spacer />
            <v-col>
              {{ $my.format(comment.created_at) }}
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object
    },
    currentUserId: {
      type: Number
    }
  },
  data () {
    return {
      avatarUrl: 'http://localhost:3000' + this.comment.user.avatar.url
    }
  },
  computed: {
    isMyComment () {
      return this.comment.user_id === this.currentUserId
    }
  },
  methods: {
    destroyComment (commentId) {
      this.$emit('destroyCommentEvent', commentId)
    }
  }
}
</script>
