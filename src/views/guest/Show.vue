<template>
  <div>
    <v-sheet class="pa-3" v-if="skeleton" :loading="skeleton">
      <v-skeleton-loader class="mx-auto" type="table"></v-skeleton-loader>
    </v-sheet>
    <v-container v-else>
      <h1 class="text-center">{{ report.clarification.title }}</h1>
      <v-breadcrumbs
      :items="pages"
      large
    ></v-breadcrumbs>
      <v-card :loading="loading">
        <v-card-title>
          Aduan Berita
        </v-card-title>
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
                  <th>Waktu Pelaporan</th>
                  <td>:</td>
                  <td>
                      {{ moment(report.created_at).locale('id').format('LL') }}
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
                      <v-chip color="light-blue darken-1" dark v-if="report.clarified == true || report.clarified == 1 || report.clarified == '1'"><v-icon left>check</v-icon>Selesai Diklarifikasi</v-chip>
                    <v-chip color="blue-grey darken-1" dark v-else><v-icon left>close</v-icon>Belum Diklarifikasi</v-chip>
                  </td>
                </tr>
                <tr>
                  <th>Status Berita Hoax/Fakta</th>
                  <td>:</td>
                  <td>
                      <div v-if="report.hoax != null">
                            <v-chip large color="red" dark v-if="report.hoax == true || report.hoax == 1 || report.hoax == '1'"><v-icon left>block</v-icon>Hoax</v-chip>
                            <v-chip large color="light-green darken-1" dark v-else><v-icon left>check</v-icon>Fakta</v-chip>
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
                      <v-chip v-if="!report.video || report.video == null">Tidak disertakan</v-chip>
                       <vue-player v-else style="width: 480px; max-width: 90%"  :poster="`http://127.0.0.1:8000/uploads/images/${images[0]}`" :src="`http://127.0.0.1:8000/uploads/videos/${report.video}`"></vue-player>
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
          <p>Berikut hasil dari klarifikasi tim Diskominfo Kabupaten Garut mengenai aduan berikut :</p>
        </section>
        <section class="mb-7">
          <h3 class="mb-3">Judul Klarifikasi</h3>
          <p>{{ report.clarification.title }}</p>
        </section>
        <section class="mb-7">
          <h3 class="mb-3">Waktu Klarifikasi</h3>
          <p>{{ moment(report.clarification.created_at).locale('id').format('LL') }}</p>
        </section>
        <section class="mb-7">
          <h3 class="mb-3">Isi Klarifikasi</h3>
          <div v-html="report.clarification.content"></div>
        </section>
        <section class="mb-7" v-if="report.clarification.link">
          <h3 class="mb-3">Link Berita</h3>
          <router-link :to="`//${report.clarification.link}`" target="_blank">{{ report.clarification.link }}</router-link>
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
          <v-chip v-if="!report.clarification.video">Tidak disertakan </v-chip>
          <vue-player style="width: 480px; max-width: 90%"  :poster="`http://127.0.0.1:8000/uploads/images/${imagesClarifications[0]}`" :src="`http://127.0.0.1:8000/uploads/videos/${report.clarification.video}`"></vue-player>

        </section>
       
      </div>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import axios from 'axios';
import moment from 'moment'
import vuePlayer  from  '@algoz098/vue-player'
Vue.component("pagination", require("laravel-vue-pagination"));

export default {
  metaInfo: {
    title: 'Detail Berita'
  },
  components:{ vuePlayer },
  data() {
    return {
      dialog: false,
      skeleton: true,
      moment,
      loading: false,
      report: {},
      form: {
        name: "",
      },
      pages: [
        {
          text: "List Berita",
          disabled: false,
          to: "/berita",
          exact: true
        },
        {
          text: 'Detail Berita',
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
    id(){
        return this.$route.params.id;
    }
  },
  methods: {
    async getReport() {
      this.loading = true;
      await axios
        .get("/guest/show/" + this.id).then((response) => {
          this.report = response.data.data.report;
          console.log(response.data.data);
          if(this.report.images){
            this.images = JSON.parse(response.data.data.report.images)
          }
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
