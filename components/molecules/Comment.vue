<template>
  <v-timeline-item
    large
  >
    <!-- アイコン -->
    <template #icon>
      <v-avatar>
        <img
          :src="avatarUrl"
          @click="moveUserPage"
        >
      </v-avatar>
    </template>
    <!-- /アイコン -->
    <!-- コメント -->
    <v-card
      class="my-1 mx-1 card-outter"
      width="100%"
      height="100%"
    >
      <v-container>
        <!-- ヘッダー -->
        <v-card-text>
          <v-row>
            <v-col>
              {{ comment.user.name }}
            </v-col>
            <v-spacer />
            <v-col
              class="text-right"
            >
              <CommentDestroyDialog
                v-if="isMyComment"
                :comment="comment"
                @destroyCommentEvent="destroyComment(comment.id)"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <!-- /ヘッダー -->
        <!-- 本文 -->
        <v-card-title class="text-h6 pb-12">
          {{ comment.comment }}
        </v-card-title>
        <!-- /本文 -->
        <!-- フッター -->
        <v-card-actions class="card-actions">
            <v-row
              align="center"
              justify="end"
            >
              <v-card-text>
                {{ $my.format(comment.created_at) }}
              </v-card-text>
          </v-row>
        </v-card-actions>
        <!-- /フッター -->
      </v-container>
    </v-card>
  </v-timeline-item>
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

<style scoped>
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
