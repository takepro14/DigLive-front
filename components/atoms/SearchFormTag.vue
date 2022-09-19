<template>
  <div>
    <v-chip-group column>
      <v-card-text>
        <h2 class="text-h6 text-center font-weight-bold">
          シーンで検索
        </h2>
      </v-card-text>
      <Tag
        v-for="tag in tags"
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
