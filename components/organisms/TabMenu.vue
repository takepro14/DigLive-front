<template>
  <v-card
    class="mx-auto"
    width="600"
  >
    <v-toolbar
      color="subheader"
      dark
      flat
    >
      <template v-slot:extension>
        <v-tabs
          centered
          slider-color="yellow"
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
