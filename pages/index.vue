<template>
  <div>
    <Header />
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
              {{ post.user_id }}
            </v-card-title>
            <v-card-text>
              {{ post.content }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <post-feed />
    <!-- new-post-button -->
    <post-dialog />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import PostDialog from '~/components/PostDialog'
import PostFeed from '~/components/PostFeed'
// import UserList from '~/components/UserList'

export default ({
  data: () => ({
    drawer: null
  }),
  components: {
    Header,
    Footer,
    PostFeed,
    PostDialog
    // UserList
  },
  async asyncData ({ $axios }) {
    let users = []
    let posts = []
    await $axios.$get('/api/v1/users')
      .then(res => (users = res))
    await $axios.$get('/api/v1/posts')
      .then(res => (posts = res))
    return {
      users,
      posts
    }
  }
})
</script>
