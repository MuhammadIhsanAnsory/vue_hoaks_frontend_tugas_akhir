<template>
  <div>
    <v-sheet class="pa-3" v-if="skeleton" :loading="skeleton">
      <v-skeleton-loader class="mx-auto" type="table"></v-skeleton-loader>
    </v-sheet>
    <v-container v-else>
      <h1>Edit Aduan</h1>
      <v-breadcrumbs :items="pages" large ></v-breadcrumbs>
      <v-alert v-if="errors.length > 0" dismissible type="error">
        <p v-for="(error, i) in errors" :key="i">{{ error }}</p>
        </v-alert>
      <v-card :loading="loading">
        <v-card-text>
            <form ref="form" @submit.prevent="submit" enctype="multipart/form-data">
            <v-text-field
              :disabled="loading"
              v-model="form.title"
              :rules="rules.required"
              label="Judul"
              required
            ></v-text-field>
            <v-textarea
              label="Isi Berita"
              v-model="form.content"
              outlined
              :rules="rules.required"
            ></v-textarea>
            <v-text-field
              :disabled="loading"
              v-model="form.link"
              :rules="rules.required"
              label="Link Sumber Berita"
              required
            ></v-text-field>
            <v-file-input label="Gambar Bukti Berita" ref="image" counter accept="image/*" v-model="form.images" show-size filled multiple prepend-icon="collections"></v-file-input>
            <p>Gambar lama (*jika menambahkan gambar, maka gambar lama akan dihapus)</p>
            <v-row>
              <v-col lg="4" sm="6" v-for="(image, i) in images" :key="i">
                  <v-img :src="`http://127.0.0.1:8000/uploads/images/${image}`" width="300px" max-width="100%" />
              </v-col>
            </v-row>
            <br>
            <br>
            <label for="video">Video Bukti Berita (opsional)</label>
            <br>
            <input
              type="file"
              id="video"
              ref="file"
              @change="handleVideoUpload"
              accept="video/*"
             />
            <br>
            <br>
            <v-chip v-if="!report.video">Video Lama Tidak disertakan</v-chip>
            <vue-player v-else style="width: 480px; max-width: 90%"  :poster="`http://127.0.0.1:8000/uploads/images/${images[0]}`" :src="`http://127.0.0.1:8000/uploads/videos/${report.video}`"></vue-player>

          

            <br>
            <br>
            <v-btn
              color="primary"
              class="mt-5"
              type="submit"
              :disabled="loading"
              :loading="loading"
            >
              Update
            </v-btn>
          </form>
        </v-card-text>
      </v-card>
      
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import vuePlayer  from  '@algoz098/vue-player'


export default {
  metaInfo: {
    title: "Edit Aduan Berita"
  },
  components:{ vuePlayer },
  data() {
    return {
      dialog: false,
      skeleton: true,
      loading: false,
      errors: [],
      report: {},
      images: [],
      video: null,
      form: {
          title: '',
          content: '',
          link: '',
          images: null,
          video: null,
      },
      pages: [
        {
          text: "List Aduan Berita",
          disabled: false,
          to: "/panel/aduan",
          exact: true
        },
        {
          text: "Edit Aduan Berita",
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
        .get("/user/report/show/" + this.id, this.config).then((response) => {
            this.form = {
                title: response.data.data.report.title,
                content: response.data.data.report.content,
                link: response.data.data.report.link,
            };
            this.report = response.data.data.report
            this.video = response.data.data.report.video
            this.images = JSON.parse(response.data.data.report.images)
            this.skeleton = false;
            this.loading = false;
        }).catch((e) => {
            this.loading = false;
            this.skeleton = false;
            this.errors = e.response;
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
        formData.append('images', this.form.images);
        formData.append('video', this.form.video);
        formData.append('title', this.form.title);
        formData.append('content', this.form.content);
        formData.append('link', this.form.link);
        formData.append('_method', 'PUT');
      await axios
        .post("/user/report/update/" + this.id , formData, this.config)
        .then((response) => {
            this.$toast.success('Berhasil mengupdate aduan berita!');
            this.message = response.data.data.message;
            this.getReport();
            this.skeleton = false;
            this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.skeleton = false;
          this.errors = e.response.data.errors;
        });
    },
    handleVideoUpload() {
      this.form.video = this.$refs.file.files[0];
    },
  },
  created(){
      this.getReport();
    this.loading = false;
    this.skeleton = false;
  }
}


</script>
