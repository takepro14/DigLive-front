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
        <v-card-text
          class="font-weight-bold"
        >
          {{ comment.comment }}
        </v-card-text>
        <v-row>
          <v-col
            class="text-center"
          >
            <v-card-text>
              {{ comment.user.name }}
            </v-card-text>
          </v-col>
          <v-col
            class="text-center"
          >
            <CommentDestroyDialog
              :comment="comment"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  props: {
    post: {
      type: Object
    }
  }
}
</script>
