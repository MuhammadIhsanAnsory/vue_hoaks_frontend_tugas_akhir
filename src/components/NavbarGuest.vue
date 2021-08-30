<template>
  <div>
    <v-app-bar color="blue darken-3" dark >
      <v-toolbar-title>HS Saber</v-toolbar-title>
      <v-spacer></v-spacer>

        <v-btn text link to="/">Home</v-btn>
        <v-btn text link to="#!">List Berita</v-btn>
        <v-btn text link to="/login">Login</v-btn>

    </v-app-bar>
  </div>
</template>

<script>
export default {
  metaInfo: { title: 'Selamat Datang' },

}
</script>
