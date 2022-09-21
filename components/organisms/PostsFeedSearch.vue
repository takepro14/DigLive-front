<template>
  <div class="mx-auto">
    <div v-if="keyword !== ''" >
      <h3>
        {{ keyword }} の検索結果 ({{ filteredPosts.length }})
      </h3>
    </div>
    <div v-else-if="genre !== ''">
      <h3>
        {{ genre }} の検索結果 ({{ filteredPosts.length }})
      </h3>
    </div>
    <div v-else-if="tag !== ''">
      <h3>
        {{ tag }} の検索結果 ({{ filteredPosts.length }})
      </h3>
    </div>
    <v-row>
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
          :currentUserId="currentUserId"
          @likePostEvent="likePost"
          @unLikePostEvent="unLikePost"
          @destroyPostEvent="destroyPost"
        />
      </v-col>
    </v-row>
  </div>
</template>
