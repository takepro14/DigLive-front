<template>
  <v-timeline
    align-top
    dense
    style="max-width: 600px"
    class="mx-auto mt-6"
  >
    <v-timeline-item
      v-for="comment in post.comments"
      :key="comment.id"
      large
    >
      <template #icon>
        <v-avatar>
          <img src="https://i.pravatar.cc/64">
        </v-avatar>
      </template>
      <v-card
        class="elevation-2"
        min-width="300"
        max-width="600"
      >
        <v-card-text>
          <v-row>
            <v-col>
              {{ comment.user.name }}
            </v-col>
            <v-spacer />
            <v-col>
              <CommentDestroyDialog
                v-if="comment.user_id === currentUserId"
                :comment="comment"
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
    post: {
      type: Object
    },
    currentUserId: {
      type: Number
    }
  }
}
</script>
