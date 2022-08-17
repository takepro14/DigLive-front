<template>
  <div>
    <before-login-header />
    <!-- <after-login-header /> -->
    <!-- posts -->
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
    <!-- <post-feed /> -->
    <!-- new-post-button -->
    <post-dialog />
    <before-login-footer />
  </div>
</template>

<script>
import BeforeLoginHeader from '~/components/BeforeLogin/BeforeLoginHeader'
import BeforeLoginFooter from '~/components/BeforeLogin/BeforeLoginFooter'
// import AfterLoginHeader from '~/components/AfterLogin/AfterLoginHeader'
// import PostDialog from '~/components/Post/PostDialog'
// import PostFeed from '~/components/Post/PostFeed'

export default {
  data: () => ({
    drawer: null
  }),
  components: {
    BeforeLoginHeader,
    // AfterLoginHeader,
    BeforeLoginFooter
    // PostDialog
    // PostFeed,
    // UserList
  },
  async asyncData ({ $axios }) {
    let posts = []
    await $axios.$get('/api/v1/posts')
      .then(res => (posts = res))
    return {
      posts
    }
  }
}
</script>
