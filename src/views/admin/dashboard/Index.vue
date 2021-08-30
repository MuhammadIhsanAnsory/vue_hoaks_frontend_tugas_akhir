<template>
  <div>
    <v-container>
      <h1>Dashboard Admin</h1>
      <v-row class="d-flex justify-center mt-5">
        <v-col lg="4" md="6" sm="12">
           <v-card color="indigo darken-1" dark link>
            <div class="text-center pt-4">
              <v-icon large>people</v-icon>
              <h2>Pengguna</h2>
            </div>
            <v-card-text>
              <p class="text-center font-weight-bold">70 Orang</p>
            </v-card-text>
          </v-card>
        </v-col>
        
        <v-col lg="4" md="6" sm="12">
          <v-card color="light-blue darken-3" dark link to="/file">
            <div class="text-center pt-4">
              <v-icon large>menu_book</v-icon>
              <h2>Buku</h2>
            </div>
            <v-card-text>
              <p class="text-center font-weight-bold">34 Buku</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col lg="4" md="6" sm="12">
          <v-card color="cyan darken-4" dark link>
            <div class="text-center pt-4">
              <v-icon large>play_circle_filled</v-icon>
              <h2>Videp Pembelajaran</h2>
            </div>
            <v-card-text>
              <p class="text-center font-weight-bold">24 Video</p>
            </v-card-text>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  metaInfo: { title: 'Dashboard' }
}
</script>
