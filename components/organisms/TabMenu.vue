<template>
  <v-card
    class="mx-auto"
    width="100%"
  >
    <v-toolbar
      color="header"
      dark
      flat
    >
      <v-toolbar-title
        class="mx-auto"
      >
        フィード
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
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      tabs: [
        {
          title: '最新',
          name: 'New'
        },
        {
          title: 'フォロー',
          name: 'Follow'
        }
      ]
    }
  },
  methods: {
    tabClick (tabName) {
      this.$emit('tabClickEvent', tabName)
    }
  }
}
</script>
