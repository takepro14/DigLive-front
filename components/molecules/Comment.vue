<template>
  <v-card
    class="my-1 mx-1 card-outter"
    width="100%"
    height="100%"
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
                :src="avatarUrl"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                  {{ comment.user.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-spacer />
            <CommentDestroyDialog
              v-if="isMyComment"
              :comment="comment"
              @destroyCommentEvent="destroyComment(comment.id)"
            />
          </v-list-item>
        </v-col>
      </v-row>
      <!-- /ヘッダー -->
      <!-- 本文 -->
      <v-row>
        <v-col>
          <v-card-text class="text-h6 pb-12">
            {{ comment.comment }}
          </v-card-text>
        </v-col>
      </v-row>
      <!-- /本文 -->
      <!-- フッター -->
      <v-card-actions
        class="card-actions"
      >
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
