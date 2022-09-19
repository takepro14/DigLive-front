<template>
  <div>
    <v-text-field
      label="キーワード検索"
      filled
      rounded
      dense
      v-model="setKeyword"
      @focus="formKeywordFocusIn"
    />
  </div>
</template>

<script>
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  computed: {
    setKeyword: {
      get () { return this.keyword },
      set (newVal) { return this.$emit('update:keyword', newVal) }
    }
  },
  methods: {
    formKeywordFocusIn () {
      this.$emit('formKeywordFocusInEvent')
    }
  }
}
</script>
