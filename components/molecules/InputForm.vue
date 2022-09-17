<template>
  <v-container
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <!--
        共通フォーマット
      -->
      <v-col
        cols="12"
        class="my-8 text-center"
      >
        <h1
          class="text-h5 font-weight-bold"
        >
          {{ appName }}に{{ pageTitle }}
        </h1>
      </v-col>
      <!--
        入力フォームスロット
      -->
      <v-card
        flat
        width="80%"
        min-width="400px"
        color="transparent"
      >
        <slot
          name="user-form-card-content"
        />
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data ({ $route, $config: { appName }, $my }) {
    return {
      appName,
      // signup => title.signup, login => title.login
      pageTitle: $my.pageTitle($route.name)
    }
  }
}
</script>
