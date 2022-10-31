<template>
  <div>
    <v-footer
      absolute
      color="black white--text"
      :height="height"
    >
      <v-col
        cols="12"
        class="py-0"
      >
        <div
          class="text-center"
          :style="{ letterSpacing: '2px' }"
        >
          &copy;{{ copyRightYear }}
          <strong>{{ appName }}</strong>
        </div>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
export default {
  data ({ $config: { appName } }) {
    return {
      appName,
      height: 32
    }
  },
  computed: {
    copyRightYear () {
      const beginningYear = 2022
      const thisYear = new Date().getFullYear()
      return (beginningYear < thisYear)
        ? `${beginningYear} - ${thisYear}`
        : beginningYear
    }
  }
}
</script>
