<template>
  <v-footer
    absolute
    color="black white--text"
    height="auto"
    class="py-0"
  >
    <v-container>
      <v-row>
        <v-col class="text-center py-0">
          &copy;{{ copyRightYear }}
          <strong class="title">
            {{ appName }}
          </strong>
        </v-col>
      </v-row>
      <v-row class="text-center">
        <v-col cols="4" class="py-0">
          <PrivacyPolicy />
        </v-col>
        <v-col cols="4" class="py-0">
          <TermsOfService />
        </v-col>
        <v-col cols="4" class="py-0">
          <Contact />
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data ({ $config: { appName } }) {
    return {
      appName
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

<style scoped>
.title {
  font-family: 'Audiowide', cursive !important;
}
</style>
