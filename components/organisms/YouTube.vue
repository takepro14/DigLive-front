<template>
  <div>
    <youtube
      ref="youtube"
      :video-id="getVideoId"
      @playing="playing"
      @paused="paused"
      @ended="ended"
      fit-parent
    />
  </div>
</template>

<script>
import Vue from 'vue'
import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)

export default {
  props: {
    youtube_url: {
      type: String
    }
  },
  computed: {
    getVideoId () {
      const url = this.youtube_url
      const videoIdPrefix = url.indexOf('=') + 1
      return url.substring(videoIdPrefix)
    }
  },
  methods: {
    playVideo () {
      this.player.playVideo()
    },
    playing () {
      console.log('we are watching!!!')
    },
    paused () {
      console.log('paused')
    },
    ended () {
      console.log('ended')
    }
  }
}
</script>
