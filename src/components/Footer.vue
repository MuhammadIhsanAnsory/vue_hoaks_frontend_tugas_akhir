<template>
  <div>
    <v-footer dark padless >
      <v-card flat tile class="blue-grey darken-4 white--text" >
      

        <v-card-text class="white--text py-15">
          <v-row>
            <v-col lg="2" md="12">
              <div class="text-center">
                <img src="@/assets/logo-trans.png" width="90px" />
              </div>
            </v-col>
            <v-col lg="6" md="6">
              <h2 class="mb-5">APLIKASI HOAKS SARA DISKOMINFO KABUPATEN GARUT</h2>
              <p>Aplikasi Berita Hoaks SARA ini merupakan aplikasi yang bisa menampung keingingan masyarakat untuk mendapatkan klarifikasi dari Diskominfor Kabupaten Garut yang mana Diskominfo Kabupaten Garut adalah lembaga yang menangani dan mengontrol peredaran berita hoaks di Kabupaten Garut</p>
            </v-col>
            <v-col lg="4" md="6">
              <h2 class="mb-5">Usefull Links</h2>
              <router-link to="/" class="white--text subtitle-2 font-weight-medium">Home</router-link>
              <br>
              <router-link to="/berita" class="white--text subtitle-2 font-weight-medium">List Berita</router-link>
              <br>
              <router-link to="/login" class="white--text subtitle-2 font-weight-medium">Login</router-link>
              <br>
              <router-link to="/register" class="white--text subtitle-2 font-weight-medium">Daftar</router-link>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-text class="white--text text-center">
          <strong> {{ new Date().getFullYear() }} &copy; Muhamad Ihsan Ansory - 23183017</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>