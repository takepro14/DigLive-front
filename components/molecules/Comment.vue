<template>
  <v-card
    class="my-1 mx-1"
    width="100%"
  >
    <v-container>
      <v-row>
        <v-col>
          <v-list-item
            class="grow"
            @click.stop="moveUserPage"
          >
            <!--------------------------------------------------
              アバター
            --------------------------------------------------->
            <v-list-item-avatar>
              <v-img
                class="elevation-6"
                alt=""
                :src="avatarUrl"
              />
            </v-list-item-avatar>
            <!--------------------------------------------------
              ユーザ名
            --------------------------------------------------->
            <v-list-item-content>
              <v-list-item-title>
                  {{ comment.user.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-spacer />
            <!--------------------------------------------------
              コメント削除ダイアログ
            --------------------------------------------------->
            <CommentDestroyDialog
              v-if="isMyComment"
              :comment="comment"
              @destroyCommentEvent="destroyComment(comment.id)"
            />
          </v-list-item>
        </v-col>
      </v-row>
      <!--------------------------------------------------
        コメント本文
      --------------------------------------------------->
      <v-row>
        <v-col>
          <v-card-text
            class="text-h6"
          >
            {{ comment.comment }}
          </v-card-text>
        </v-col>
      </v-row>
      <!--------------------------------------------------
        コメント日時
      --------------------------------------------------->
      <v-row>
        <v-spacer />
        <v-col>
          {{ $my.format(comment.created_at) }}
        </v-col>
      </v-row>
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
