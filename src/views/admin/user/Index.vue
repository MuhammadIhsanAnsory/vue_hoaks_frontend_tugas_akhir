<template>
  <div>
    <v-sheet class="pa-3" v-if="skeleton" :loading="skeleton">
      <v-skeleton-loader class="mx-auto" type="table"></v-skeleton-loader>
    </v-sheet>
    <v-container v-else>
      <h1>List Pengguna</h1>

      <v-card :loading="loading">
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Nama</th>
                  <th class="text-left">Email</th>
                  <th class="text-left">Nomor HP</th>
                  <th class="text-left">Status</th>
                  <th class="text-left text-center">
                    Aksi <br />
                    <small>Blokir/Buka Blokir</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, i) in users.data" :key="i">
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.phone }}</td>
                  <td>
                    <v-chip color="grey" dark v-if="user.blocked == true || user.blocked == 1 || user.blocked == '1'"><v-icon left>block</v-icon>Diblokir</v-chip>
                    <v-chip v-else color="light-green darken-1" dark class="my-2"><v-icon left>check</v-icon> Aktif</v-chip>
                  </td>
                  <td class="text-center">
                    <v-tooltip bottom v-if="user.blocked == true || user.blocked == 1 || user.blocked == '1'" >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="mx-2" fab dark x-small color="light-green" v-bind="attrs" v-on="on" @click="unblockUser(user.id)">
                          <v-icon dark> visibility </v-icon>
                        </v-btn>
                      </template>
                      <span>Buka Blokir</span>
                    </v-tooltip>
                    <v-tooltip bottom v-else>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="mx-2" fab dark x-small color="red" v-bind="attrs" v-on="on" @click="blockUser(user.id)" >
                          <v-icon dark> block </v-icon>
                        </v-btn>
                      </template>
                      <span> Blokir Pengguna</span>
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
          :data="users"
          @pagination-change-page="getUsers"
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
    title: "List Pengguna"
  },
  data() {
    return {
      dialog: false,
      skeleton: true,
      loading: false,
      users: {},
      form: {
        name: "",
      },
      pages: [
        {
          text: "List Pengguna",
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
    async getUsers(page) {
      this.loading = true;
      if (typeof page === "undefined") {
        page = 1;
      }
      await axios
        .get("/admin/user?page=" + page, this.config)
        .then((response) => {
          this.users = response.data.data.users;
                    console.log('getuser');
          this.skeleton = false;
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.skeleton = false;
          this.errors = e.response;
      });
    },
    blockUser(id) {
        this.$confirm({
            message: "Blokir user ini?",
            button: {
            no: "Kembali",
            yes: "Blokir",
            },
            callback: (confirm) => {
            if (confirm) {
                this.loading = true;
                axios.get(`/admin/user/block/${id}`).then((response) => {
                    this.$toast.warning("Pengguna telah diblokir!");
                    this.message = response.data.message;
                    console.log('block');
                    this.getUsers();
                    this.loading = false;
                }).catch((e) => {
                    this.errors = e.response.data.message;
                    this.skeleton = false;
                    this.loading = false;
                });
            }
            },
        });
    },
    unblockUser(id) {
        this.$confirm({
            message: "Buka blokir user ini?",
            button: {
            no: "Kembali",
            yes: "Buka Blokir",
            },
            callback: (confirm) => {
            if (confirm) {
                this.loading = true;
                axios
                .get(`/admin/user/unblock/${id}`)
                .then((response) => {
                    this.$toast.success("Berhasil membuka blokir pengguna!");
                    this.message = response.data.message;
                    console.log('unblock');
                    this.getUsers();
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
    this.getUsers();
  },
}


</script>
