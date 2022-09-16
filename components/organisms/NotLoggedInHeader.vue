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
      <!--------------------------------------------------
        アプリロゴ・タイトル
      --------------------------------------------------->
      <Title />
      <v-spacer />
      <!--------------------------------------------------
        新規登録ボタン
      --------------------------------------------------->
      <v-btn
        outlined
        color="button"
        class="ml-2 font-weight-bold"
        to="/signup"
      >
        {{ $my.pageTitle('signup') }}
      </v-btn>
      <!--------------------------------------------------
        ログインボタン
      --------------------------------------------------->
      <v-btn
        text
        dark
        class="ml-2 font-weight-bold"
        to="/login"
      >
        {{ $my.pageTitle('login') }}
      </v-btn>
    </v-app-bar>
  </div>
</template>
