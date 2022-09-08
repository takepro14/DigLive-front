<template>
  <div
    class="mx-auto"
  >
    <v-container>
      <v-row>
        <!-- 検索結果: 0件 -->
        <v-col
          v-if="(keyword !== '') && !filteredUsers.length"
        >
          <h3>
            {{ keyword }} の検索結果: {{ filteredUsers.length }}人のユーザー
          </h3>
        </v-col>
        <!-- 検索結果: 1件以上 -->
        <v-col
          v-else-if="(keyword !== '') && filteredUsers.length"
        >
          <h3>
            {{ keyword }} の検索結果: {{ filteredUsers.length }}人のユーザー
          </h3>
          <User
            v-for="user in filteredUsers"
            :key="user.id"
            :user="user"
            :currentUser="currentUser"
          />
        </v-col>
        <!-- 初期表示(フィード) -->
        <v-col
          v-else
        >
          <div
            v-for="user in users"
            :key="user.id"
          >
            <User
              v-if="user.id !== currentUser.id"
              :user="user"
              :currentUser="currentUser"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array
    },
    keyword: {
      type: String
    },
    filteredUsers: {
      type: Array
    },
    currentUser: {
      type: Object
    }
  }
}
</script>
