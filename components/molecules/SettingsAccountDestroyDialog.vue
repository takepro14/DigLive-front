<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <!--  削除確認ボタン -->
    <template #activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        block
        color="red white--text"
      >
        アカウントを削除する
      </v-btn>
    </template>
    <!--  /削除確認ボタン -->
    <!--  削除確認モーダル -->
    <v-card>
      <v-card-title class="headline header text-subtitle-1 white--text">
        アカウントを削除する
      </v-card-title>
      <div class="ma-4">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="py-4">
              <span class="font-weight-bold">
                本当にアカウントを削除しますか？
              </span>
            </v-list-item-title>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="red white--text"
                width="100%"
                :disabled="isGuest"
                @click="destroyAccount"
              >
                削除する
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-list-item-content>
        </v-list-item>
      </div>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="dialog = false"
        >
          閉じる
        </v-btn>
      </v-card-actions>
    </v-card>
    <!--  削除確認モーダル -->
  </v-dialog>
</template>

<script>
export default {
  props: {
    currentUser: {
      type: Object
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    isGuest () {
      return this.currentUser.isGuest
    }
  },
  methods: {
    destroyAccount () {
      this.$emit('destroyAccountEvent')
    }
  }
}
</script>
