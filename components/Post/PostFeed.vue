<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card
          elevation="2"
          v-for="post in posts"
          :key="post.id"
          class="pa-2 ma-2"
        >
          <v-card-title>
            {{ post.user.name }}
          </v-card-title>
          <v-card-text>
            {{ post.content }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // async asyncData ({ $axios }) {
  //   let posts = []
  //   await $axios.$get('/api/v1/posts')
  //     .then(res => (posts = res))
  //   return {
  //     posts
  //   }
  // }
}
</script>
