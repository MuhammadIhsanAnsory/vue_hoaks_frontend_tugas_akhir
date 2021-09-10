<template>
  <div>
    <v-sheet class="pa-3" v-if="skeleton" :loading="skeleton">
        <v-skeleton-loader class="mx-auto" type="table"></v-skeleton-loader>
    </v-sheet>
    <div v-else>
        <section>
            <v-container>
                <v-chip color="blue lighten-4" text-color="light-blue darken-3">LIST BERITA</v-chip>
                <h2 class="my-4">List Berita Terbaru</h2>
                <v-row>
                  <v-col lg="10" sm="12">
                    <v-text-field  :loading="loading" v-model="keyword" label="Cari Berita"></v-text-field>
                  </v-col>
                  <v-col lg="2" sm="12">
                    <v-btn color="light-blue" dark @click="searchReport()" :loading="loading">
                      <v-icon>search</v-icon> Cari
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-btn color="light-blue" outlined :disabled="showAs == 'all'" @click="sortReport('all')">Semua Berita</v-btn>
                  <v-btn color="light-blue" outlined :disabled="showAs == 'hoax'"  class="ml-3" @click="sortReport('hoax')">Hoaks</v-btn>
                  <v-btn color="light-blue" outlined :disabled="showAs == 'fact'"  class="ml-3" @click="sortReport('fact')">Fakta</v-btn>
                </v-row>
                <v-row class="mt-8">
                    <v-col lg="4" sm="12" v-for="(report, i) in reports.data" :key="i">
                        <v-card  :loading="loading">
                            <v-img :src="`http://127.0.0.1:8000/uploads/images/${imgs[i]}`" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="260px" >
                                <v-card-title>
                                    <router-link :to="`/berita/detail/${report.id}/${report.slug}`">
                                        <h3 class="title white--text">{{ report.title }}</h3> 
                                    </router-link>
                                    <div>
                                      <v-chip class="ma-2" color="red" dark label small v-if="report.hoax == true || report.hoax == 1 || report.hoax == '1'">
                                        <v-icon left> block </v-icon> Hoaks
                                      </v-chip>
                                      <v-chip class="ma-2" color="light-green" dark label small v-else>
                                        <v-icon left> check_circle </v-icon> Fakta
                                      </v-chip>
                                      <small>{{ moment(report.created_at).locale('id').format('LL') }}</small>
                                    </div>
                                </v-card-title>
                            </v-img>
                        </v-card>
                    </v-col>
                </v-row>
                <div class="mt-10">
                  <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
                    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
                    crossorigin="anonymous"
                  />
                  <pagination 
                    v-if="showAs == 'all'"
                    :data="reports"
                    @pagination-change-page="getReports"
                    align="center"
                  ></pagination>
                  <pagination
                    v-if="showAs == 'search'"
                    :data="reports"
                    @pagination-change-page="searchReport"
                    align="center"
                  ></pagination>
                  <pagination
                    v-if="showAs == 'hoax'"
                    :data="reports"
                    @pagination-change-page="getReportsHoax"
                    align="center"
                  ></pagination>
                  <pagination
                    v-if="showAs == 'fact'"
                    :data="reports"
                    @pagination-change-page="getReportsHoax"
                    align="center"
                  ></pagination>
                </div>
            </v-container>
        </section>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from 'axios'
import moment from 'moment'
Vue.component("pagination", require("laravel-vue-pagination"));

export default {
    metaInfo: {
    title: "List Berita"
  },
    data(){
        return {
            skeleton: true,
            loading: false,
            paginationSearch: false,
            moment: moment,
            keyword: '',
            reports: {},
            imgs:[],
            hoaxs: {},
            facts: {},
            showAs: 'all',
            by: 1
        }
    },
    computed: {
      id(){
        return this.$route.params.id;
      }
    },
    methods: {
        async getReports(page) {
          if (typeof page === "undefined") {
            page = 1;
          }
            this.loading = true;
            this.paginationSearch = false;
            this.showAs = 'all';
            await axios.get("/guest?page=" + page).then((response) => {
                this.reports = response.data.data.reports;
                this.imgs = [];
                this.reports.data.forEach(report => {
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
        async searchReport(page){
          if (this.keyword.length < 1) {
            this.getReports();
          } else {
            if (typeof page === "undefined") {
              page = 1;
            }
            this.loading = true;
            this.paginationSearch = true;
            this.showAs = 'search';

            await axios
              .get(`/guest/search/${this.keyword}?page=${page}`)
              .then(response => {
                this.imgs = [];
                this.reports.data.forEach(report => {
                    let img = JSON.parse(report.images);
                    this.imgs.push(img[0])
                });
                this.reports = response.data.data.reports;
                this.loading = false;
              })
              .catch(e => {
                this.errors = e.response;
                this.loading = false;
              });
          }
        },
        async getReportsHoax(page){
          if (typeof page === "undefined") {
            page = 1;
          }
          this.loading = true;
          await axios.get(`/guest/report/sort/${this.by}?page=${page}`).then(response => {
            this.reports = response.data.data.reports;
            this.imgs = [];
            this.reports.data.forEach(report => {
                let img = JSON.parse(report.images);
                this.imgs.push(img[0])
            });
            this.loading = false;
          }).catch(e => {
            this.errors = e.response;
            this.loading = false;
          });
        },
        sortReport(by){
          if(by == 'hoax'){
            this.showAs = 'hoax';
            this.by = 1;
            this.getReportsHoax()
          }else if(by == 'fact'){
            this.showAs = 'fact';
            this.by = 0;
            this.getReportsHoax()
          }else{
            this.getReports();
          }
        }
    },
    created() {
        this.getReports();
    },
}
</script>

<style scoped>
    p{
        font-size: 20px;
    }
    section{
        padding: 7rem 0;
    }
</style>
