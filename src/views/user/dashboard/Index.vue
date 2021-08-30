<template>
  <div>
    <v-container>
      <h1>List Laporan</h1>
      <v-card :loading="loading">
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Judul</th>
                  <th class="text-left">Digunakan Artikel</th>
                  <th class="text-left text-center">
                    Aksi <br />
                    <small>Edit | Hapus</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(report, i) in reports.data" :key="i">
                  <td>{{ report.name }}</td>
                  <td>{{ report.posts.length }} artikel</td>
                  <td class="text-center">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="mx-2"
                          fab
                          dark
                          x-small
                          color="green"
                          v-bind="attrs"
                          v-on="on"
                          link
                          :to="`/admin/kategori/edit/${report.id}`"
                        >
                          <v-icon dark> border_color </v-icon>
                        </v-btn>
                      </template>
                      <span>Edit</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="report.posts.length < 1">
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
          text: "List Kategori",
          disabled: true,
          to: "/admin/kategori",
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
        .get("/user/report?page=" + page, this.config)
        .then((response) => {
          this.reports = response.data.data.reports;
          this.skeleton = false;
          this.loading = false;
        })
        .catch((e) => {
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
