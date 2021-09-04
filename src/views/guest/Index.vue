<template>
  <div>
      <v-row>
          <v-col lg="8" sm="12">
            <v-carousel cycle hide-delimiter-background height="440px">
                <v-carousel-item v-for="(report,i) in reports" :key="i" :src="report.images[0]" reverse-transition="fade-transition" transition="fade-transition" >
                    <v-row class="fill-height mt-14" align="center" justify="center">
                        <h2 class="display-2 white--text">{{ report.title }}</h2>
                    </v-row>
                </v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col lg="4" sm="12">
              <v-row>
                <v-col cols="12">
                    <v-img src="https://cdn.pixabay.com/photo/2020/07/10/14/11/fake-news-5390815_960_720.jpg" height="240px" width="100%">
                        <v-row class="fill-height mt-14" align="center" justify="center">
                            <h2 class="white--text">Coba</h2>
                        </v-row>
                    </v-img>
                </v-col>
                <v-col cols="6">
                    <v-img src="https://cdn.pixabay.com/photo/2020/07/10/14/11/fake-news-5390815_960_720.jpg" height="175" width="100%">
                         <v-row class="fill-height mt-14" align="center" justify="center">
                            <h2 class="white--text">Coba</h2>
                        </v-row>
                    </v-img>
                </v-col>
                <v-col cols="6">
                    <v-img src="https://cdn.pixabay.com/photo/2021/02/22/01/48/fake-news-6038455_960_720.png" height="175"  width="100%">
                         <v-row class="fill-height mt-14" align="center" justify="center">
                            <h2 class="white--text">Coba</h2>
                        </v-row>
                    </v-img>
                </v-col>

              </v-row>
          </v-col>
      </v-row>
    <v-container>
        <div class="text-center">
            <h1 class="display-3 mb-4">Selamat Datang di <br>HS Saber</h1>
            <p>Aplikasi Aduan Berita HOAKS SARA</p>

        </div>
        
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            reports: {},
            hoaxs: {},
            facts: {},
        }
    },
    methods: {
        async getReport() {
            this.loading = true;
            await axios.get("/guest/landing").then((response) => {
                console.log(response.data.data);
                this.reports = response.data.data.reports;
                this.hoaxs = response.data.data.hoaxs;
                this.facts = response.data.data.facts;
                this.skeleton = false;
                this.loading = false;
            }).catch((e) => {
                this.loading = false;
                this.skeleton = false;
                this.errors = e.response;
            });
        },
    },
    created() {
        this.getReport();
    },
}
</script>
