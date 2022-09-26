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
        プロフィールを変更する
      </v-card-title>
      <div class="ma-4">
        <v-list-item>
          <!-- 変更なし時の表示 -->
          <v-list-item-content v-if="!changeTargetLists.length">
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
            <div v-if="changeTargetLists.includes('name')">
              <v-list-item-title class="pt-6">
                ユーザー名
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ name }}
              </v-list-item-subtitle>
            </div>
            <div v-if="changeTargetLists.includes('profile')">
              <v-list-item-title class="pt-6">
                プロフィール
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ profile }}
              </v-list-item-subtitle>
            </div>
            <div v-if="changeTargetLists.includes('avatar')">
              <v-list-item-title class="pt-6">
                プロフィール画像
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ avatar }}
              </v-list-item-subtitle>
            </div>
            <div v-if="changeTargetLists.includes('checkedGenres')">
              <v-list-item-title class="pt-6">
                好きな音楽ジャンル
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ displayCheckedGenres }}
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
    name: {
      type: String
    },
    profile: {
      type: String
    },
    avatar: {
      type: String
    },
    changeTargetLists: {
      type: Array
    },
    displayCheckedGenres: {
      // なし、になる場合もあるため
      type: [Array, String]
    }
  },
  data () {
    return {
      dialog: false
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
