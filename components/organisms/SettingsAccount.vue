<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col>
          <v-form ref="form">
            <InputFormEmail :email.sync="params.user.email" />
            <InputFormPassword :password.sync="params.user.password" />
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
</script>
