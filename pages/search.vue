<template>
  <div>
    <!-- タグ一覧 -->
    <div
      class="px-4"
    >
      <v-chip-group
        active-class="primary--text"
        column
      >
        <PostFeedTag
          v-for="tag in tags"
          :key="tag.id"
          :tag="tag"
        />
      </v-chip-group>
    </div>
    <!-- フリーワード検索 -->
    <div>
      <v-text-field
        label="フリーワード検索"
        placeholder="知りたいことを検索"
        filled
        rounded
        dense
        v-model="filterQuery.content"
        @input="emitFilterQuery(filterQuery.content)"
      />
    </div>
    {{ filterQuery.content }}
    <div>
      <PostFeed
        v-for="post in filteredPosts"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'logged-in',
  data () {
    return {
      keyword: '',
      filterQuery: {
        content: ''
      }
    }
  },
  middleware: [
    'authentication'
  ],
  computed: {
    ...mapGetters({
      tags: 'modules/tag/tags',
      posts: 'modules/post/posts',
      filteredPosts: 'modules/post/filteredPosts'
    })
  },
  methods: {
    ...mapActions({
      getTags: 'modules/tag/getTags',
      getPosts: 'modules/post/getPosts',
      emitFilterQuery: 'modules/post/emitFilterQuery'
    })
  },
  mounted () {
    this.getPosts()
    // this.emitFilterQuery(this.filterQuery)
  }
}
</script>
