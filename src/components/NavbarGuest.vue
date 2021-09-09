<template>
  <div>
    <v-app-bar color="blue darken-3" dark >
      <v-toolbar-title>
        <router-link to="#">
          <img src="@/assets/logo-trans.png" width="35px" />
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

        <v-btn text link to="/">Home</v-btn>
        <v-btn text link to="/berita">List Berita</v-btn>
        <v-btn text link to="/login">Login</v-btn>

    </v-app-bar>
  </div>
</template>

<script>
export default { }
</script>
