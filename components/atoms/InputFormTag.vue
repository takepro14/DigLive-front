<template>
  <VueTagsInput
    v-model="inputTag"
    :inputTags="initTags"
    @tags-changed="newTags => inputTags = newTags"
    :autocomplete-items="filteredItems"
    :placeholder="displayPlaceholder"
  />
</template>

<script>
export default {
  props: {
    initTags: {
      type: Array
    },
    tags: {
      type: Array
    }
  },
  data () {
    return {
      // input中のテキスト
      inputTag: '',
      // 確定したタグの配列: [{ "text": "タグ", "tiClasses": [ "ti-valid" ] }, {...}]
      inputTags: this.initTags,
      autocompleteItems: []
    }
  },
  computed: {
    // 入力文言を含むタグをオートコンプリート表示する
    filteredItems () {
      return this.autocompleteItems.filter((i) => {
        return i.text.includes(this.inputTag)
      })
    },
    // 未入力の場合にのみplaceholderを表示
    displayPlaceholder () {
      return !this.inputTags.length ? '一体感、臨場感、ギターソロ...etc' : ''
    }
  },
  watch: {
    inputTags (newValue) {
      this.$emit('changed-tags', newValue)
    }
  },
  created () {
    this.autocompleteItems = this.tags.map((tag) => {
      return { text: tag.tag_name }
    })
  }
}
</script>

<style>
.ti-tag {
  background-color: #FFF8E1 !important;
  color: black !important;
}
</style>
