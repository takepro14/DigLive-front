<template>
  <v-toolbar
    color="header"
    dark
    flat
  >
    <v-toolbar-title class="mx-auto text-subtitle-1">
      設定
    </v-toolbar-title>
    <template #extension>
      <v-tabs
        centered
        slider-color="slider"
        grow
      >
        <v-tab
          v-for="tab in tabs"
          :key="tab.id"
          @click="tabClick(tab.name)"
        >
          {{ tab.title }}
        </v-tab>
      </v-tabs>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    tab: {
      type: String
    },
    tabs: {
      type: Array
    }
  },
  methods: {
    tabClick (tabName) {
      this.$emit('tabClickEvent', tabName)
    }
  }
}
</script>
