<template>
  <vue-tags-input
    v-model="tag"
    :tags="initTags"
    @tags-changed="newTags => tags = newTags"
    :autocomplete-items="filteredItems"
    style="color: #fff"
    :placeholder="dispPlaceholder"
  />
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
    },
    // 未入力の場合にのみplaceholderを表示
    dispPlaceholder () {
      if (!this.tags.length) {
        return 'ex) 一体感, 臨場感, ギターソロ, ...etc'
      } else {
        return ''
      }
    }
  },
  watch: {
    tags (newValue) {
      this.$emit('changed-tags', newValue)
    }
  }
}
</script>

<style>
.ti-tag {
  background-color: #FFF8E1 !important;
  color: black !important;
}
</style>
