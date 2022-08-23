<template>
  <div>
    <v-text-field
      label="フリーワード検索"
      placeholder="知りたいことを検索"
      filled
      rounded
      dense
      v-model="keyword"
      @focus="emitSetFilterQueryTagBlank"
      @blur="setupFormKeywordWhenBlur"
      @input="emitSetFilterQueryKeyword(keyword)"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    ...mapActions({
      emitSetFilterQueryKeyword: 'modules/post/emitSetFilterQueryKeyword',
      emitSetFilterQueryTagBlank: 'modules/post/emitSetFilterQueryTagBlank',
      emitSetFilterQueryKeywordBlank: 'modules/post/emitSetFilterQueryKeywordBlank'
    }),
    setupFormKeywordWhenBlur () {
      this.keyword = ''
      this.emitSetFilterQueryKeywordBlank()
    }
  }
}
</script>
