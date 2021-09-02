<template>
  <div>
    <v-sheet class="pa-3" v-if="skeleton" :loading="skeleton">
      <v-skeleton-loader class="mx-auto" type="table"></v-skeleton-loader>
    </v-sheet>
    <v-container v-else>
      <h1>Tambah Aduan</h1>
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
            <!-- <label for="image">Bukti Gambar Berita</label>
            <br>
             <input type="file" id="image" ref="image" v-on:change="handleImageUpload()" accept="image/*" />
            <br>
            <br>
            <label for="image">Bukti Video Berita</label>
            <br>
             <input type="file" id="video" ref="video" v-on:change="handleVideoUpload()" accept="video/*" />
            <br>
            <br> -->
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
            <input
              type="file"
              id="video"
              ref="file"
              @change="handleVideoUpload"
              accept="video/*"
             />
            <br>
            <br>
            <v-btn
              color="primary"
              class="mt-5"
              type="submit"
              :disabled="loading"
              :loading="loading"
            >
              Simpan
            </v-btn>
          </form>
        </v-card-text>
      </v-card>
      
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  metaInfo: {
    title: "Tambah Aduan Berita"
  },
  data() {
    return {
      dialog: false,
      skeleton: true,
      loading: false,
      report: {},
      errors: [],
      form: {
      },
      pages: [
        {
          text: "List Aduan Berita",
          disabled: false,
          to: "/panel/aduan",
          exact: true
        },
        {
          text: "Tambah Aduan Berita",
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
  },
  methods: {
    async submit() {
        this.loading = true;
        let formData = new FormData();
        for( var i = 0; i < this.form.images.length; i++ ){
            let file = this.form.images[i];
            formData.append('images[]', file);
        }
        formData.append('images', this.form.image);
        formData.append('video', this.form.video);
        formData.append('title', this.form.title);
        formData.append('content', this.form.content);
        formData.append('link', this.form.link);
        console.log(this.form.video);
        console.log(this.form.image);
      await axios
        .post("/user/report/store/" , formData, this.config)
        .then((response) => {
            this.$toast.success('Berhasil menyimpan aduan berita!');
            this.message = response.data.data.message;
            this.skeleton = false;
            this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.skeleton = false;
          this.errors = e.response.data.errors;
        });
    },
    // handleImageUpload() {
    //    this.form.image = this.$refs.image.files[0];
    // },
    handleVideoUpload() {
      this.form.video = this.$refs.file.files[0];
    },
  },
  created(){
    this.loading = false;
    this.skeleton = false;
  }
}


</script>
