<template>
  <div>
    <v-img
      dark
      src="top.jpg"
      :height="imgHeight"
    >
      <v-row
        align="center"
        justify="center"
        :style="{ height: `${imgHeight}px` }"
      >
        <v-col
          cols="12"
          class="text-center"
        >
          <!-- <h1 class="display-1 mb-4">
            ライブ映像でアーティストを“布教”しよう
          </h1> -->
          <h4
            class="subheading"
            :style="{ letterSpacing: '5px' }"
          >
            ライブ映像で最高の音楽を広めよう
          </h4>
        </v-col>
      </v-row>
    </v-img>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgHeight: 500
    }
  }
}
</script>
