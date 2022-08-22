<template>
  <v-card
    class="mx-auto my-4"
    min-width="300"
    max-width="600"
    :to="`/posts/${post.id}`"
  >
    <v-card-text
      class="font-weight-bold"
    >
      {{ post.content }}
    </v-card-text>
    <div
      class="px-4"
    >
      <v-chip-group
        active-class="primary--text"
        column
      >
        <v-chip
          v-for="tag in post.tags"
          :key="tag.id"
          link
        >
          # {{ tag.tag_name }}
        </v-chip>
      </v-chip-group>
    </div>
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
            {{ post.user }}
            <!-- {{ post.user.name }} -->
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
</template>

<script>
export default {
  props: {
    post: {
      type: Object
    }
  }
}
</script>
