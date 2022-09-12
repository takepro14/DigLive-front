<template>
  <!-- <v-timeline
    align-top
    dense
    style="max-width: 600px"
    class="mx-auto mt-6"
  > -->
  <div
    class="mx-auto my-6"
  >
    <Comment
      v-for="comment in post.comments"
      :key="comment.id"
      :comment="comment"
      :currentUserId="currentUserId"
      @destroyCommentEvent="destroyComment"
    />
  </div>
  <!-- </v-timeline> -->
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    post: {
      type: Object
    },
    currentUserId: {
      type: Number
    }
  },
  methods: {
    ...mapActions({
      destroyComment: 'modules/post/destroyComment'
    })
  }
}
</script>
