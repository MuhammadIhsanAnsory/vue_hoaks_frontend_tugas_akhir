<template>
  <div>
      <v-row>
          <v-col lg="8" sm="12">
            <v-carousel cycle hide-delimiter-background height="440px">
                <v-carousel-item v-for="(report,i) in reports" :key="i" :src="`http://127.0.0.1:8000/uploads/images/${imgs[i]}`" reverse-transition="fade-transition" transition="fade-transition" >
                    <v-row class="fill-height mt-14" align="center" justify="center">
                        <h2 class="display-2 white--text">{{ report.title }}</h2>
                    </v-row>
                </v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col lg="4" sm="12">
              <v-row>
                <v-col cols="12" v-if="reports.length > 0">
                    <v-img :src="`http://127.0.0.1:8000/uploads/images/${imgs[0]}`" height="240px" width="100%">
                        <v-row class="fill-height mt-14" align="center" justify="center">
                            <h2 class="white--text">{{ reports[0].title }}</h2>
                        </v-row>
                    </v-img>
                </v-col>
                <v-col cols="6" v-if="reports.length > 1">
                    <v-img :src="`http://127.0.0.1:8000/uploads/images/${imgs[1]}`" height="175" width="100%">
                         <v-row class="fill-height mt-14" align="center" justify="center">
                            <h2 class="white--text">{{ reports[1].title }}</h2>
                        </v-row>
                    </v-img>
                </v-col>
                <v-col cols="6" v-if="reports.length > 2">
                    <v-img :src="`http://127.0.0.1:8000/uploads/images/${imgs[2]}`" height="175"  width="100%">
                         <v-row class="fill-height mt-14" align="center" justify="center">
                            <h2 class="white--text">{{ reports[2].title }}</h2>
                        </v-row>
                    </v-img>
                </v-col>

              </v-row>
          </v-col>
      </v-row>
        <section>
            <v-container class="py-8">
                <div class="text-center">
                    <h1 class="display-3">Selamat Datang di Hoaks SARA Saber</h1>
                </div>
            </v-container>
        </section>
        <section class="py-5">
            <v-container>
                <div class="text-center">
                    <v-chip color="blue lighten-4" text-color="light-blue darken-3">APA ITU HOAKS SARA?</v-chip>
                    <h2>Apa Itu Berita Hoaks SARA</h2>
                </div>
                <v-row class="mt-5">
                    <v-col lg="8" sm="12">
                        <p><b>Hoaks</b> atau dalam bahasa Inggris Hoax adalah berita yang isinya bohong atau tidak sesuai dengan kejadian yang ada. Menurut Abdul Majid hoaks atau kabar bohong merupakan kabar yang sudah direncanakan oleh penyebarnya, merupakan manipulasi berita yang sengaja dilakukan dan bertujuan untuk memberikan pengakuan atau pemahaman yang salah.</p>
                        <p><b>SARA</b> merupakan akronim dari Suku, Ras, dan Agama pengaruhnya sangat besar di Indonesia. Karena Indonesia memiliki keragaman suku, ras, dan agama di setiap daerah, menjadikan SARA sebagai isu yang sangat sensitif. Apalagi ketika isu SARA ini dibarengi dengan berita hoaks akan menjadi permasalahan yang pelik di Indonesia, karena ketika sebuah berita hoaks SARA mencuat masyarakat akan sangat mudah terprovokasi oleh berita tersebut. </p>
                    </v-col>
                    <v-col lg="4" sm="12">
                        <div class="text-center">
                            <img src="https://cdn.pixabay.com/photo/2017/02/25/10/11/hoax-2097365_960_720.jpg" width="90%" />
                            <p>Hoaks</p>
                        </div>
                    </v-col>
                </v-row>
                <h3 class="mt-4"></h3>
            </v-container>
        </section>
        <section class="py-5">
            <v-container>
                <div class="text-center">
                    <v-chip color="blue lighten-4" text-color="light-blue darken-3">SIAPA KAMI?</v-chip>
                    <h2 class="my-4">Apa Itu Aplikasi Hoaks SARA?</h2>
                </div>
                <p>Isu SARA (Suku, Ras, dan Agama) merupakan isu yang dalam beberapa tahun ini di Indonesia sedang hangat-hangatnya. Isu ini sangat memberikan dampak yang besar karena ketiga hal itu masih sangat erat kaitannya di kehidupan sehari-hari masyarakat Indonesia. Apalagi ketika isu SARA ini ternyata hoaks atau berita palsu, berita bohong adalah berita yang isinya tidak sesuai dengan kebenaran yang sesungguhnya.</p>
                <p>Sehingga kami menyediakan web untuk Anda yang ingin mencari berita yang telah di klarifikasi oleh DISKOMINFO KABUPATEN GARUT</p>
                <v-row>
                    <v-col lg="4" sm="12">
                        <v-card class="mx-auto" color="light-blue" dark max-width="400" height="200px">
                            <v-card-title>
                            <v-icon large left > check_circle </v-icon>
                            <span class="text-h6">Aduan Berita</span>
                            </v-card-title>
                            <v-card-text class="text-h5 white--text font-weight-bold">
                                Anda bisa mengadukan berita yang dianggap belum jelas kebenarannya
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col lg="4" sm="12">
                        <v-card class="mx-auto" color="light-blue" dark max-width="400" height="200px">
                            <v-card-title>
                            <v-icon large left > check_circle </v-icon>
                            <span class="text-h6">Cari Berita</span>
                            </v-card-title>
                            <v-card-text class="text-h5 white--text font-weight-bold">
                                Anda juga bisa mencari berita yang sudah diklarifikasi
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col lg="4" sm="12">
                        <v-card class="mx-auto" color="light-blue" dark max-width="400" height="200px">
                            <v-card-title>
                            <v-icon large left > check_circle </v-icon>
                            <span class="text-h6">Tenang Membagikan Berita</span>
                            </v-card-title>
                            <v-card-text class="text-h5 white--text font-weight-bold">
                                Dengan berita yang sudah diklarifikasi Anda pun tenang untuk membagikan berita!
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <p class="mt-6">Dengan begitu Anda bisa dengan mudah meminta klarifikasi atas berita yang tersebar.</p>
            </v-container>
        </section>
        <section class="py-12" style="background-color: #0277BD; color: white;">
            <v-container>
                <div class="text-center">
                    <v-chip color="blue lighten-4" text-color="light-blue darken-3">CARA PAKAI</v-chip>
                    <h2 class="my-4">Bagaimana Cara Menggunakan Web Hoaks SARA?</h2>
                </div>
                <p class="mt-4">Cara pakai web hoaks SARA ini sangat mudah dan tidak akan membuat Anda kebingungan. Web ini didesain sedemikian rupa agar pengguna bisa mengoprasikan web ini dengan mudah dan tanpa membutuhkan keahlian tertentu.</p>
                <p>Berikut langkah pemakaian web ini :</p>
                <v-row>
                    <v-col lg="4" sm="12">
                        <v-card color="white" height="170px">
                            <v-card-title>
                                <h4 class="display-2"><v-icon>double_arrow</v-icon> 1</h4>
                            </v-card-title>
                            <v-card-text>
                                <p>Login ke web hoaks SARA</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col lg="4" sm="12">
                        <v-card color="white" height="170px">
                            <v-card-title>
                                <h4 class="display-2"><v-icon>double_arrow</v-icon> 2</h4>
                            </v-card-title>
                            <v-card-text>
                                <p>Bila belum punya akun, silahkan daftar terlebih dahulu</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col lg="4" sm="12">
                        <v-card color="white" height="170px">
                            <v-card-title>
                                <h4 class="display-2"><v-icon>double_arrow</v-icon> 3</h4>
                            </v-card-title>
                            <v-card-text>
                                <p>Setelah login akan diarahkan ke halaman dashboard</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col lg="4" sm="12">
                        <v-card color="white" height="170px">
                            <v-card-title>
                                <h4 class="display-2"><v-icon>double_arrow</v-icon> 4</h4>
                            </v-card-title>
                            <v-card-text>
                                <p>Buat aduan baru dan isi form aduan</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col lg="4" sm="12">
                        <v-card color="white" height="170px">
                            <v-card-title>
                                <h4 class="display-2"><v-icon>double_arrow</v-icon> 5</h4>
                            </v-card-title>
                            <v-card-text>
                                <p>Aduan akan diproses oleh Diskominfo Kabupaten Garut</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col lg="4" sm="12">
                        <v-card color="white" height="170px">
                            <v-card-title>
                                <h4 class="display-2"><v-icon>double_arrow</v-icon> 6</h4>
                            </v-card-title>
                            <v-card-text>
                                <p>Cek status aduan secara berkala untuk melihat apakah aduan sudah diklarifikasi atau belum</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </section>
        <section class="py-8">
            <v-container>
                <div class="text-center">
                    <v-chip color="blue lighten-4" text-color="light-blue darken-3">LIST BERITA</v-chip>
                    <h2 class="my-4">Cek Berita Yang Telah Diklarifikasi</h2>
                </div>
                <v-row>
                    <v-col lg="3" sm="12" v-for="(report, i) in reports" :key="i">
                        <v-card>
                            <v-img
                            :src="`http://127.0.0.1:8000/uploads/images/${imgs[i]}`"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px"
                            >
                                <v-card-title v-text="report.title"></v-card-title>
                            </v-img>
                            <v-card-actions>
                                <v-btn link text to="#!" color="blue darken-4" block>
                                    Lihat Detail
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <v-btn link to="/list-berita" class="mt-9" color="light-blue" dark block>
                    Lihat Selengkapnya
                </v-btn>
            </v-container>
        </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            reports: {},
            imgs:[],
            hoaxs: {},
            facts: {},
        }
    },
    methods: {
        async getReport() {
            this.loading = true;
            await axios.get("/guest/landing").then((response) => {
                this.reports = response.data.data.reports;
                this.hoaxs = response.data.data.hoaxs;
                this.facts = response.data.data.facts;
                this.reports.forEach(report => {
                    let img = JSON.parse(report.images);
                    this.imgs.push(img[0])
                });
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

<style scoped>
    p{
        font-size: 20px;
    }
</style>
