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
        :key="tag.id"
        :tag="tag"
      />
    </v-chip-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      tags: 'modules/tag/tags'
    })
  },
  methods: {
    ...mapActions({
      getTags: 'modules/tag/getTags'
    })
  },
  mounted () {
    this.getTags()
  }
}
</script>
