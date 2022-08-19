<template>
  <div>
    <v-card
      v-for="(post, index) in getPostAndTag"
      :key="index"
      class="mx-auto my-4"
      min-width="300"
      max-width="600"
    >
      <v-card-text
        class="font-weight-bold"
      >
        {{ post.content }}
      </v-card-text>
      <v-btn
        v-for="tag in post.tags"
        :key="tag"
      >
        {{ tag.tag_name }}
      </v-btn>
      <v-card-actions>
        <v-list-item
          class="grow"
        >
          <v-list-item-avatar
            color="grey darken-3"
          >
            <v-img
              class="elevation-6"
              alt=""
              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ post.user.name }}
            </v-list-item-title>
          </v-list-item-content>
          <v-row
            align="center"
            justify="end"
          >
            <v-icon
              class="mr-1"
            >
              mdi-heart
            </v-icon>
            <span
              class="subheading mr-2"
            >
              256
            </span>
            <v-icon
              class="ml-3 mr-1"
            >
              mdi-comment-processing-outline
            </v-icon>
            <span
              class="subheading"
            >
              45
            </span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
    <PostDialog />
  </div>
</template>

<script>
export default {
  layout: 'logged-in',
  middleware: [
    'authentication',
    'get-post-list'
  ],
  computed: {
    getPostAndTag () {
      return this.$store.state.post.list
    }
    // getTag () {
    //   return this.$store.state.post.tags
    // }
  }
}
</script>
