<template>
  <div
    class="px-4"
  >
    <v-chip-group
      active-class="primary--text"
      column
    >
      <Tag
        v-for="tag in tags"
        :key="tag.name"
        :tag="tag"
        v-model="setTags"
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
    }
  },
  methods: {
    formTagChecked (value) {
      this.$emit('formTagCheckedEvent', value)
    },
    formTagUnchecked () {
      this.$emit('formTagUncheckedEvent')
    }
  }
}
</script>
