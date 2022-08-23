<template>
  <div>
    <v-chip
      link
      filter
      @click="toggleTag"
    >
      # {{ tag.tag_name }}
    </v-chip>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      tagCheckFlg: false
    }
  },
  props: {
    tag: {
      type: Object
    }
  },
  methods: {
    ...mapActions({
      emitSetTagTrue: 'modules/tag/emitSetTagTrue',
      emitSetTagFalse: 'modules/tag/emitSetTagFalse',
      emitSetFilterQueryTag: 'modules/post/emitSetFilterQueryTag',
      emitSetFilterQueryKeywordBlank: 'modules/post/emitSetFilterQueryKeywordBlank',
      emitSetFilterQueryTagBlank: 'modules/post/emitSetFilterQueryTagBlank'
    }),
    toggleTag () {
      this.tagCheckFlg = !this.tagCheckFlg
      if (this.tagCheckFlg) {
        this.emitSetTagTrue(this.tag.tag_name)
        this.emitSetFilterQueryKeywordBlank()
        this.emitSetFilterQueryTag()
      } else {
        this.emitSetTagFalse()
        this.emitSetFilterQueryTagBlank()
      }
    }
  }
}
</script>
