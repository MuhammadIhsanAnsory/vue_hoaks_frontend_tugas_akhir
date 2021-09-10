<template>
  <div>
    <v-sheet class="pa-3" v-if="skeleton" :loading="skeleton">
      <v-skeleton-loader class="mx-auto" type="table"></v-skeleton-loader>
    </v-sheet>
    <v-card v-else>
      <v-card-title>
        <h1>List Klarifikasi</h1>
      </v-card-title>
      <v-card-text>

      <v-card :loading="loading">
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Judul Klarifikasi</th>
                  <th class="text-left">Judul Aduan</th>
                  <th class="text-left">Pengklarifikasi</th>
                  <th class="text-left">Email</th>
                  <th class="text-left">Status</th>
                  <th class="text-left text-center">
                    Aksi <br />
                    <small>Detail | Hapus</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(clarification, i) in clarifications.data" :key="i">
                  <td>{{ clarification.title }}</td>
                  <td>{{ clarification.report.title }}</td>
                  <td>{{ clarification.user.name }}</td>
                  <td>{{ clarification.user.email }}</td>
                  <td class="text-center">
                    <v-chip color="red darken-1" dark v-if="clarification.hoax == true || clarification.hoax == 1 || clarification.hoax == '1'"><v-icon left>block</v-icon>Hoax</v-chip>
                    <v-chip color="green" dark v-else><v-icon left>check</v-icon>Fakta</v-chip>
                  </td>
                  <td class="text-center">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="mx-2" fab dark x-small color="blue" v-bind="attrs" v-on="on" link :to="`/admin/aduan/detail/${clarification.report.id}/${clarification.report.slug}`" >
                          <v-icon dark> visibility </v-icon>
                        </v-btn>
                      </template>
                      <span>Detail</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="mx-2" fab dark x-small color="green" v-bind="attrs" v-on="on" link :to="`/admin/klarifikasi/edit/${clarification.id}/${clarification.slug}`" >
                          <v-icon dark> border_color </v-icon>
                        </v-btn>
                      </template>
                      <span>Edit</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="mx-2" fab dark x-small color="red" v-bind="attrs" v-on="on" @click.prevent="deleteClarification(clarification.id)" >
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
          :data="clarifications"
          @pagination-change-page="getClarifications"
          align="right"
        ></pagination>
      </div>
      </v-card-text>
      
    </v-card>
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
      clarifications: {},
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
    async getClarifications(page) {
      this.loading = true;
      if (typeof page === "undefined") {
        page = 1;
      }
      await axios
        .get("/admin/clarification?page=" + page, this.config)
        .then((response) => {
            console.log(response.data.data.clarifications);
          this.clarifications = response.data.data.clarifications;
          this.skeleton = false;
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.skeleton = false;
          this.errors = e.response;
      });
    },
    deleteClarification(id) {
        this.$confirm({
            message: "Hapus klarifikasi aduan ini?",
            button: {
            no: "Kembali",
            yes: "Hapus",
            },
            callback: (confirm) => {
            if (confirm) {
                this.loading = true;
                axios
                .delete(`/admin/clarification/destroy/${id}`)
                .then((response) => {
                    this.$toast.warning("Klarifikasi aduan telah dihapus!");
                    this.message = response.data.message;
                    this.getClarifications();
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
    this.getClarifications();
  },
}


</script>
