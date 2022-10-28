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
        <v-list-item>
          <v-row class="d-flex justify-space-between">
            <v-col>
              <v-list-item-subtitle
                class="font-weight-bold text-left wrap-text"
                @click="moveUserPage"
              >
                {{ comment.user.name }}
              </v-list-item-subtitle>
            </v-col>
            <v-col
              class="text-right"
            >
              <CommentDestroyDialog
                v-if="isMyComment"
                :comment="comment"
                @destroyCommentEvent="destroyComment"
              />
            </v-col>
          </v-row>
        </v-list-item>
        <!-- /ヘッダー -->
        <!-- 本文 -->
        <v-row>
          <v-col>
            <div>
              <v-card-text>
                {{ comment.comment }}
              </v-card-text>
            </div>
            <div>
              <v-card-text class="text-right">
                {{ $my.format(comment.created_at) }}
              </v-card-text>
            </div>
          </v-col>
        </v-row>
        <!-- /本文 -->
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
      avatarUrl: this.comment.user.avatar.url
    }
  },
  computed: {
    isMyComment () {
      return this.comment.user_id === this.currentUserId
    }
  },
  methods: {
    moveUserPage () {
      this.$router.push(`/users/${this.comment.user_id}`)
    },
    destroyComment () {
      this.$emit('destroyCommentEvent', this.comment.id)
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
