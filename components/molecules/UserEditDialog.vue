<!--
  ユーザ詳細(マイページ)からプロフィールを変更するダイアログ
-->
<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <!-- Dialog close -->
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
      <!-- Dialog open -->
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
        >
          プロフィールを編集する
        </v-card-title>
        <!-- プロフィール内容 -->
          <div>
            <v-file-input
              label="image"
              accept="image/*"
              v-model="addImage"
              prepend-icon="mdi-camera"
            />
          </div>
        <!-- プロフィール内容 -->
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red lighten-2"
            @click="handleSubmit"
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
    handleSubmit () {
      const formData = new FormData()
      formData.append('avatar', this.addImage)
      const config = {
        headders: {
          'content-type': 'multipart/form-data'
        }
      }
      this.$emit('submit', formData, config)
    }
  }
}
</script>
