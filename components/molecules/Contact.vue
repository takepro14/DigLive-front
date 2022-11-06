<template>
  <v-btn
    outlined
    text
    color="white"
    @click="externalLink"
  >
    <small>
      お問合せ
    </small>
  </v-btn>
</template>

<script>
export default {
  data () {
    return {
      contactUrl: 'https://twitter.com/takepro14'
    }
  },
  methods: {
    externalLink () {
      window.open(this.contactUrl, '_blank')
    }
  }
}
</script>
