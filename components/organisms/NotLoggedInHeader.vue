<template>
  <div
    class="mb-16"
  >
    <v-app-bar
      fixed
      fab
      top
      color="header"
    >
      <Title />
      <v-spacer></v-spacer>
        <!-- 新規登録ボタン -->
        <v-btn
          outlined
          dark
          color="blue lighten-2"
          class="ml-2 font-weight-bold"
          to="/signup"
        >
          {{ $my.pageTitle('signup') }}
        </v-btn>
        <!-- ログインボタン -->
        <v-btn
          text
          class="ml-2 font-weight-bold"
          to="/login"
        >
          {{ $my.pageTitle('login') }}
        </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
}
</script>
