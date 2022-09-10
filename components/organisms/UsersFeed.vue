<template>
  <div
    class="mx-auto"
  >
    <!-- 最新タブ -->
    <div
      v-if="newUsersTab"
    >
      <!-- 検索結果: 0件 -->
      <div
        v-if="(keyword !== '') && !filteredUsers.length"
      >
        <h3>
          {{ keyword }} の検索結果: {{ filteredUsers.length }}人のユーザー
        </h3>
      </div>
      <!-- 検索結果: 1件以上 -->
      <div
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
      </div>
      <!-- 初期表示(フィード) -->
      <div
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
            class="my-6"
          />
        </div>
      </div>
    </div>
    <!-- フォロータブ -->
    <div
      v-else-if="followedUsersTab"
    >
      <div
        v-for="user in followedUsers"
        :key="user.id"
      >
        <User
          v-if="user.id !== currentUser.id"
          :user="user"
          :currentUser="currentUser"
          class="my-6"
        />
      </div>
    </div>
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
    },
    tab: {
      type: String
    },
    followedUsers: {
      type: Array
    }
  },
  computed: {
    newUsersTab () {
      return this.tab === 'New'
    },
    followedUsersTab () {
      return this.tab === 'Follow'
    }
  }
}
</script>
