<template>
  <div>
    <v-chip-group column>
      <v-card-text>
        <h2 class="text-h6 text-center font-weight-bold">
          シーンで検索
        </h2>
      </v-card-text>
      <Tag
        v-for="tag in randomTags"
        :key="tag.tag_name"
        :tag="tag"
        @formTagCheckedEvent="formTagChecked"
        @formTagUncheckedEvent="formTagUnchecked"
      />
    </v-chip-group>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array
    },
    tag: {
      type: String
    }
  },
  computed: {
    setTag: {
      get () { return this.tag },
      set (newVal) { return this.$emit('update:tag', newVal) }
    },
    randomTags () {
      return this.getRandomTags(this.tags, 30)
    }
  },
  methods: {
    formTagChecked (value) {
      this.$emit('formTagCheckedEvent', value)
    },
    formTagUnchecked () {
      this.$emit('formTagUncheckedEvent')
    },
    getRandomTags (array, num) {
      const a = array
      const t = []
      const r = []
      let l = a.length
      let n = num < l ? num : l
      while (n-- > 0) {
        const i = Math.random() * l | 0
        r[n] = t[i] || a[i]
        --l
        t[i] = t[l] || a[l]
      }
      return r
    }
  }
}
</script>
