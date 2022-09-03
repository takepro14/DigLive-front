<!--
  ユーザ詳細(マイページ)からプロフィールを変更するダイアログ
-->
<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <!--
        ダイアログクローズ
      -->
      <template
        #activator="{ on, attrs }"
      >
        <v-btn
          v-bind="attrs"
          v-on="on"
          outlined
          rounded
          text
        >
          プロフィール編集
        </v-btn>
      </template>
      <!--
        ダイアログオープン
      -->
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
        >
          プロフィールを編集する
        </v-card-title>
          <div>
            <v-file-input
              label="画像を選択"
              accept="image/*"
              v-model="addImage"
              prepend-icon="mdi-camera"
            />
          </div>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red lighten-2"
            @click="changeAvatar"
          >
            画像を変更する
          </v-btn>
          <v-spacer />
        </v-card-actions>
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
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object
    }
  },
  data () {
    return {
      dialog: false,
      addImage: []
    }
  },
  methods: {
    changeAvatar () {
      const formData = new FormData()
      formData.append('avatar', this.addImage)
      const config = {
        headders: {
          'content-type': 'multipart/form-data'
        }
      }
      this.$emit('changeAvatarEvent', { formData, config })
      this.dialog = false
    }
  }
}
</script>
