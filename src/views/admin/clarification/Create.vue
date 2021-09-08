<template>
  <div>
    <v-sheet class="pa-3" v-if="skeleton" :loading="skeleton">
      <v-skeleton-loader class="mx-auto" type="table"></v-skeleton-loader>
    </v-sheet>
    <v-container v-else>
      <h1>Klarifikasi Aduan</h1>
      <v-breadcrumbs :items="pages" large ></v-breadcrumbs>
        <v-card>
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
                            <v-btn v-else color="blue" text link :to="`//127.0.0.1:8000/report/download-video/${report.id}/${report.slug}`" target="_blank">Download Video</v-btn>
                        </td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
        </v-card>
      <v-card class="mt-6" :loading="loading">
        <v-card-title>
            Buat Klarifikasi
        </v-card-title>
        <v-card-text>
            <v-alert v-if="errors.length > 0" dismissible type="error">
                <p v-for="(error, i) in errors" :key="i">{{ error }}</p>
            </v-alert>
            <form ref="form" @submit.prevent="submit" enctype="multipart/form-data">
            <v-text-field
              :disabled="loading"
              v-model="form.title"
              :rules="rules.required"
              label="Judul"
              required
            ></v-text-field>
              <v-switch
                v-model="form.hoax"
                label="Hoaks"
                color="red"
            ></v-switch>
            <div class="mt-5">
              <label for="content">Isi</label>
            </div>
            <ckeditor :editor-url="editorUrl" v-model="form.content" :config="editorConfig" ></ckeditor>
            <v-text-field
              :disabled="loading"
              v-model="form.link"
              :rules="rules.required"
              label="Link Sumber Berita"
              required
            ></v-text-field>
            <v-file-input
                label="Gambar Bukti Berita"
                ref="image"
                counter
                accept="image/*"
                v-model="form.images"
                show-size
                :rules="rules.required"
                filled
                multiple
                prepend-icon="camera"
            ></v-file-input>
            <br>
            <label for="video">Video Bukti Berita (opsional)</label>
            <br>
            <input type="file" id="video" ref="file" @change="handleVideoUpload" accept="video/*" />
            <br>
            <br>
            <v-btn color="primary" class="mt-5" type="submit" :disabled="loading" :loading="loading" >
              Simpan Klarifikasi
            </v-btn>
          </form>
        </v-card-text>
      </v-card>
      
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import axios from 'axios';
import CKEditor from "ckeditor4-vue";
Vue.use(CKEditor);

export default {
  metaInfo: {
    title: "Tambah Klarifikasi Aduan"
  },
  data() {
    return {
      dialog: false,
      skeleton: true,
      loading: false,
      report: {},
      errors: [],
      form: {
          title: '',
          content: '',
          link: '',
          hoax: false,
          images: null
      },
      pages: [
        {
          text: "List Aduan Berita",
          disabled: false,
          to: "/admin/aduan",
          exact: true
        },
        {
          text: "Tambah Klarifikasi Aduan",
          disabled: true,
          to: "#!",
          exact: true
        },
      ],
      rules: {
        required: [
          (v) => !!v || "Wajib diisi",
        ],
      },
      editorConfig: {},
      editorUrl: "https://cdn.ckeditor.com/4.16.0/full/ckeditor.js",
      images: [],
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
          "Content-Type": "multipart/form-data"
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
        .get("/admin/report/show/" + this.id, this.config).then((response) => {
          this.report = response.data.data.report;
          console.log(response.data.data.report);
          this.images = JSON.parse(response.data.data.report.images)
          this.skeleton = false;
          this.loading = false;
        }).catch((e) => {
          this.loading = false;
          this.skeleton = false;
          return e;
        //   this.errors = e.response;
        });
    },
    async submit() {
        this.loading = true;
        let formData = new FormData();
        if(this.form.images){
            for( var i = 0; i < this.form.images.length; i++ ){
                let file = this.form.images[i];
                formData.append('images[]', file);
            }
        }
        formData.append('report_id', this.id);
        formData.append('images', this.form.images);
        formData.append('video', this.form.video);
        formData.append('title', this.form.title);
        formData.append('content', this.form.content);
        formData.append('link', this.form.link);
        formData.append('hoax', this.form.hoax);
      await axios
        .post("/admin/clarification/store/" , formData, this.config)
        .then((response) => {
            this.$toast.success('Berhasil menyimpan klarifikasi aduan berita!');
            this.message = response.data.data.message;
            this.skeleton = false;
            this.loading = false;
            this.$router.push(`/admin/aduan/detail/${this.report.id}/${this.report.slug}`);
        })
        .catch((e) => {
          this.loading = false;
          this.skeleton = false;
          console.log(e.response);
          this.errors = e.response.data.errors;
        });
    },
    handleVideoUpload() {
      this.form.video = this.$refs.file.files[0];
    },
  },
  created(){
    this.getReport();
  }
}


</script>
