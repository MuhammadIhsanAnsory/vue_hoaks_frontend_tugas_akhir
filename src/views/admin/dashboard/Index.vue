<template>
  <div>
    <v-container>
      <h1>Dashboard Admin</h1>
      <v-row class="d-flex justify-center mt-5">
        <v-col lg="4" md="6" sm="12">
           <v-card color="indigo darken-1" dark link to="/admin/pengguna">
            <div class="text-center pt-4">
              <v-icon large>people</v-icon>
              <h2>Pengguna</h2>
            </div>
            <v-card-text>
              <p class="text-center font-weight-bold">{{ user }} Orang</p>
            </v-card-text>
          </v-card>
        </v-col>
        
        <v-col lg="4" md="6" sm="12">
          <v-card color="light-blue darken-3" dark link to="/admin/aduan">
            <div class="text-center pt-4">
              <v-icon large>report</v-icon>
              <h2>Aduan</h2>
            </div>
            <v-card-text>
              <p class="text-center font-weight-bold">{{ report }} Aduan</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col lg="4" md="6" sm="12">
          <v-card color="cyan darken-4" dark link to="/admin/klarifikasi">
            <div class="text-center pt-4">
              <v-icon large>fact_check</v-icon>
              <h2>Klarifikasi</h2>
            </div>
            <v-card-text>
              <p class="text-center font-weight-bold">{{ clarification }} Klarifikasi</p>
            </v-card-text>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  metaInfo: { title: 'Dashboard Admin' },
  data() {
    return {
      dialog: false,
      skeleton: true,
      loading: false,
      report: 0,
      clarification: 0,
      user: 0,
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
    async getDashboard() {
      this.loading = true;
      await axios
        .get("/admin/dashboard", this.config)
        .then((response) => {
          this.report = response.data.data.report;
          this.user = response.data.data.user;
          this.clarification = response.data.data.clarification;
          this.skeleton = false;
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.skeleton = false;
          this.errors = e.response;
      });
    },
  },
  created() {
    this.getDashboard();
  },
}
</script>
