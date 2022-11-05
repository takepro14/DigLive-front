<template>
  <div>
    <!-- 描画なし(scriptのみ) -->
    <CommonSearch
      :keyword="keyword"
      :genre="genre"
      :tag="tag"
      @startSearchEvent="isLoading = true"
      @stopSearchEvent="isLoading = false"
    />
    <!-- /描画なし(scriptのみ) -->
    <v-list-item v-if="isSearching">
      <v-list-item-title>
        <span>
          {{ keyword || genre || tag }} の検索結果：
        </span>
        <span class="font-weight-bold">
          {{ filteredPosts.length }}件
        </span>
      </v-list-item-title>
    </v-list-item>
    <v-row v-if="isLoading">
      <v-col
        v-for="n in 10"
        :key="n"
        cols="12"
        sm="12"
        md="12"
        lg="6"
        xl="4"
      >
        <LoaderTypeCard />
      </v-col>
    </v-row>
    <v-row class="mt-1 mb-8">
      <v-col
        v-for="post in filteredPosts"
        :key="post.id"
        cols="12"
        sm="12"
        md="12"
        lg="6"
        xl="4"
      >
        <Post
          :post="post"
          :currentUserId="currentUser.id"
          @likePostEvent="likePost"
          @unLikePostEvent="unLikePost"
          @destroyPostEvent="destroyPost"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    keyword: {
      type: String
    },
    genre: {
      type: String
    },
    tag: {
      type: String
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'modules/user/currentUser',
      filteredPosts: 'modules/post/filteredPosts'
    }),
    isSearching () {
      return this.keyword || this.genre || this.tag
    }
  },
  methods: {
    ...mapActions({
      likePost: 'modules/post/likePost',
      unLikePost: 'modules/post/unLikePost',
      destroyPost: 'modules/post/destroyPost'
    })
  }
}
</script>
