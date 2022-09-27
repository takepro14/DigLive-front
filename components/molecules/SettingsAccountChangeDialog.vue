<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <!--  変更確認ボタン -->
    <template #activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        block
        dark
        color="button"
        @click="changeTarget"
      >
        設定を変更する
      </v-btn>
    </template>
    <!--  /変更確認ボタン -->
    <!--  変更確認モーダル -->
    <v-card>
      <v-card-title class="headline header white--text">
        アカウント情報を変更する
      </v-card-title>
      <div class="ma-4">
        <v-list-item>
          <!-- 変更なし時の表示 -->
          <v-list-item-content v-if="isNoChanged">
            <v-list-item-title class="py-4">
              変更する項目はありません
            </v-list-item-title>
          </v-list-item-content>
          <!-- /変更なし時の表示 -->
          <!-- 変更あり時の表示 -->
          <v-list-item-content v-else>
            <v-list-item-title class="py-4">
              以下の内容を変更します
            </v-list-item-title>
            <div v-if="isChanged('email')">
              <v-list-item-title class="pt-6">
                メールアドレス
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ email }}
              </v-list-item-subtitle>
            </div>
            <div v-if="isChanged('password')">
              <v-list-item-title class="pt-6">
                パスワード
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ password }}
              </v-list-item-subtitle>
            </div>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="button"
                dark
                width="100%"
                @click="submitChangedData"
              >
                変更を確定する
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-list-item-content>
          <!-- /変更あり時の表示 -->
        </v-list-item>
      </div>
      <!-- 共通表示 -->
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
      <!-- /共通表示 -->
    </v-card>
    <!--  変更確認モーダル -->
  </v-dialog>
</template>

<script>
export default {
  props: {
    email: {
      type: String
    },
    password: {
      type: String
    },
    changeTargetLists: {
      type: Array
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    isNoChanged () {
      return !this.changeTargetLists.length
    },
    isChanged () {
      return (target) => {
        return this.changeTargetLists.includes(target)
      }
    }
  },
  methods: {
    changeTarget () {
      this.$emit('changeTargetEvent')
    },
    submitChangedData () {
      this.$emit('submitChangedDataEvent')
      this.dialog = false
    }
  }
}
</script>
