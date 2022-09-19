<template>
  <youtube
    ref="youtube"
    :video-id="getVideoId"
    @playing="playing"
    @paused="paused"
    @ended="ended"
    fit-parent
    resize
    :start="start"
    :playerVars="vars"
  />
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
  data () {
    return {
      start: '',
      vars: {
        origin: 'http://localhost:8080'
      }
    }
  },
  computed: {
    getVideoId () {
      const url = this.youtube_url
      if (url.includes('v=')) {
        const videoIdPrefix = url.indexOf('v=') + 2
        if (url.includes('t=')) {
          this.getVideoTimeParm(url)
          return url.substr(videoIdPrefix, 11)
        }
        return url.substr(videoIdPrefix, 11)
      } else {
        return url.slice(-11)
      }
    }
  },
  methods: {
    getVideoTimeParm (urlStr) {
      const videoTimeParmPrefix = urlStr.indexOf('t=') + 2
      const videoTimeParm = urlStr.substring(videoTimeParmPrefix)
      this.start = videoTimeParm
    },
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
