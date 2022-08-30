<!--
  新規投稿時のタグフォーム
-->
<template>
  <div>
    <!-- http://www.vue-tags-input.com/#/ -->
    <vue-tags-input
      v-model="tag"
      :tags="initTags"
      @tags-changed="newTags => tags = newTags"
      :autocomplete-items="filteredItems"
      placeholder="タグを追加: (ex. 服, 髪型, 筋トレ, ...)"
    />
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'

export default {
  components: {
    VueTagsInput
  },
  props: {
    initTags: {
      type: Array
    }
  },
  data () {
    return {
      // input中のテキスト
      tag: '',
      // 確定したタグの配列: [{ "text": "タグ", "tiClasses": [ "ti-valid" ] }, {...}]
      tags: this.initTags,
      // DBからmiddlewareで取得 => vuexに保存する?
      autocompleteItems: [{ text: '服' }, { text: '髪型' }, { text: '筋トレ' }]
    }
  },
  computed: {
    // 入力文言を含むタグをオートコンプリート表示する
    filteredItems () {
      return this.autocompleteItems.filter((i) => {
        return i.text.includes(this.tag)
      })
    }
  },
  watch: {
    tags (newValue) {
      this.$emit('changed-tags', newValue)
    }
  }
}
</script>
