<template>
  <div>
    <v-sheet class="pa-3" v-if="skeleton" :loading="skeleton">
      <v-skeleton-loader class="mx-auto" type="table"></v-skeleton-loader>
    </v-sheet>
    <v-container v-else>
      <h1>List Laporan</h1>

      <v-card :loading="loading">
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Judul</th>
                  <th class="text-left">Pelapor</th>
                  <th class="text-left">Email Pelapor</th>
                  <th class="text-left">Link Sumber</th>
                  <th class="text-left">Status</th>
                  <th class="text-left text-center">
                    Aksi <br />
                    <small>Detail | Hapus</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(report, i) in reports.data" :key="i">
                  <td>{{ report.title }}</td>
                  <td>{{ report.user.name }}</td>
                  <td>{{ report.user.email }}</td>
                  <td>{{ report.link }}</td>
                  <td class="text-center">
                    <v-chip color="light-green darken-1" dark v-if="report.clarified == true || report.clarified == 1 || report.clarified == '1'"><v-icon left>check</v-icon>Selesai Diklarifikasi</v-chip>
                    <div v-else>
                        <v-chip disabled color="blue-grey darken-1" dark class="my-2"><v-icon left>hourglass_empty</v-icon>Belum Diklarifikasi</v-chip>
                        <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mb-2" dark small color="light-blue lighten-2" v-bind="attrs" v-on="on" link :to="`/admin/klarifikasi/tambah/${report.id}/${report.slug}`" >
                             Buat Klarifikasi Sekarang
                            </v-btn>
                        </template>
                        <span>Buat Klarifikasi</span>
                        </v-tooltip>
                    </div>
                  </td>
                  <td class="text-center">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="mx-2" fab dark x-small color="blue" v-bind="attrs" v-on="on" link :to="`/admin/aduan/detail/${report.id}/${report.slug}`" >
                          <v-icon dark> visibility </v-icon>
                        </v-btn>
                      </template>
                      <span>Detail</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="mx-2" fab dark x-small color="red" v-bind="attrs" v-on="on" @click.prevent="deleteReport(report.id)" >
                          <v-icon dark> delete </v-icon>
                        </v-btn>
                      </template>
                      <span>Hapus</span>
                    </v-tooltip>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
      <div class="mt-4">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossorigin="anonymous"
        />
        <pagination
          :data="reports"
          @pagination-change-page="getReport"
          align="right"
        ></pagination>
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
      reports: {},
      form: {
        name: "",
      },
      pages: [
        {
          text: "List Aduan Berita",
          disabled: true,
          to: "#!",
          exact: true
        },
      ],
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
  },
  methods: {
    async getReport(page) {
      this.loading = true;
      if (typeof page === "undefined") {
        page = 1;
      }
      await axios
        .get("/admin/report?page=" + page, this.config)
        .then((response) => {
          this.reports = response.data.data.reports;
          this.skeleton = false;
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.skeleton = false;
          this.errors = e.response;
      });
    },
    deleteReport(id) {
        this.$confirm({
            message: "Hapus aduan ini?",
            button: {
            no: "Kembali",
            yes: "Hapus",
            },
            callback: (confirm) => {
            if (confirm) {
                this.loading = true;
                axios
                .delete(`/admin/report/destroy/${id}`)
                .then((response) => {
                    this.$toast.warning("Aduan telah dihapus!");
                    this.message = response.data.message;
                    this.getReport();
                    this.loading = false;
                })
                .catch((e) => {
                    this.errors = e.response.data.message;
                    this.skeleton = false;
                    this.loading = false;
                });
            }
            },
        });
    },
  },
  created() {
    this.getReport();
  },
}


</script>
