<template>
  <div>
    <v-sheet class="pa-3" v-if="skeleton" :loading="skeleton">
      <v-skeleton-loader class="mx-auto" type="table"></v-skeleton-loader>
    </v-sheet>
    <v-container v-else>
      <h1>List Laporan</h1>
      <v-breadcrumbs
      :items="pages"
      large
    ></v-breadcrumbs>
      <v-card :loading="loading">
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <th>Judul</th>
                  <td>:</td>
                  <td>{{ report.title }}</td>
                </tr>
                <tr>
                  <th>Isi Berita</th>
                  <td>:</td>
                  <td>
                      <div v-html="report.content"></div>
                  </td>
                </tr>
                <tr>
                  <th>Link Sumber</th>
                  <td>:</td>
                  <td>{{ report.link }}</td>
                </tr>
                <tr>
                  <th>Status Klarifikasi</th>
                  <td>:</td>
                  <td>
                      <v-chip color="light-blue darken-1" dark v-if="report.clarified == true || report.clarified == 1 || report.clarified == '1'"><v-icon left>task_alt</v-icon>Selesai Diklarifikasi</v-chip>
                    <v-chip color="blue-grey darken-1" dark v-else><v-icon left>task_alt</v-icon>Belum Diklarifikasi</v-chip>
                  </td>
                </tr>
                <tr>
                  <th>Status Berita Hoax/Fakta</th>
                  <td>:</td>
                  <td>
                      <div v-if="report.hoax != null">
                            <v-chip large color="red" dark v-if="report.hoax == true || report.hoax == 1 || report.hoax == '1'"><v-icon left>block</v-icon>Hoax</v-chip>
                            <v-chip large color="light-green darken-1" dark v-else><v-icon left>task_alt</v-icon>Fakta</v-chip>
                      </div>
                        <v-chip color="blue-grey darken-1" dark v-else><v-icon left>task_alt</v-icon>Belum Diklarifikasi</v-chip>

                  </td>
                </tr>
                <tr>
                  <th>Bukti Gambar</th>
                  <td>:</td>
                  <td>
                      <v-row>
                          <v-col lg="4" sm="6" v-for="(image, i) in images" :key="i">
                              <v-img :src="`http://127.0.0.1:8000/uploads/images/${image}`" width="300px" max-width="100%" />
                          </v-col>
                      </v-row>
                  </td>
                </tr>
                <tr>
                  <th>Bukti Video</th>
                  <td>:</td>
                  <td>
                      <v-chip v-if="!report.video">Tidak disertakan</v-chip>
                       <v-btn v-else color="blue" text link :to="`//127.0.0.1:8000/report/download-video/${report.id}`" target="_blank">Download Video</v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
            
        </v-card-text>
      </v-card>
      <div class="mt-7" v-if="report.clarified == true || report.clarified == 1 || report.clarified == '1'">
        <section class="mb-7">
          <h2 class="mb-3">Hasil Klarifikasi</h2>
          <p>Berikut hasil dari klarifikasi tim Diskominfo Kabupaten Garut mengenai aduan berikut</p>
        </section>
        <section class="mb-7">
          <h3 class="mb-3">Judul Klarifikasi</h3>
          <p>{{ report.clarification.title }}</p>
        </section>
        <section class="mb-7">
          <h3 class="mb-3">Isi Klarifikasi</h3>
          <p>{{ report.clarification.content }}</p>
        </section>
        <section class="mb-7">
          <h3 class="mb-3">Link Berita</h3>
          <v-btn color="orange" x-large link text :to="`//${report.clarification.link}`" target="_blank" block>Buka Link</v-btn>
        </section>
        <section class="mb-7">
          <h3 class="mb-3">Gambar Klarifikasi</h3>
          <v-row>
              <v-col lg="3" sm="6" v-for="(image, i) in imagesClarifications" :key="i">
                  <v-img :src="`http://127.0.0.1:8000/uploads/images/${image}`" width="300px" max-width="100%" />
              </v-col>
          </v-row>
        </section>
        <section class="mb-7" v-if="report.clarification.video">
          <h3 class="mb-3">Video Klarifikasi</h3>
          <v-chip v-if="!report.clarification.video">Tidak disertakan</v-chip>
          <v-btn v-else color="blue" text link :to="`//127.0.0.1:8000/report/download-video/${report.clarification.id}`" target="_blank">Download Video</v-btn>
        </section>
       
      </div>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import axios from 'axios';
Vue.component("pagination", require("laravel-vue-pagination"));


export default {
  metaInfo: {
    title: "List Aduan Berita"
  },
  data() {
    return {
      dialog: false,
      skeleton: true,
      loading: false,
      report: {},
      form: {
        name: "",
      },
      pages: [
        {
          text: "List Aduan Berita",
          disabled: false,
          to: "/panel/aduan",
          exact: true
        },
        {
          text: "Detail Aduan Berita",
          disabled: true,
          to: "#!",
          exact: true
        },
      ],
      images: [],
      imagesClarifications: [],
    };
  },
  computed: {
    token() {
      return this.$store.state.auth.token;
    },
    config() {
      return {
        header: {
          Authorization: "Bearer " + this.token,
        },
        crossDomain: true,
      };
    },
    id(){
        return this.$route.params.id;
    }
  },
  methods: {
    async getReport() {
      this.loading = true;
      await axios
        .get("/user/report/show/" + this.id, this.config).then((response) => {
          this.report = response.data.data.report;
          this.images = JSON.parse(response.data.data.report.images)
          if(this.report.clarification.images){
            this.imagesClarifications = JSON.parse(this.report.clarification.images)
          }
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
