<template>
  <div>
    <v-container>
      <h1>Tambah Aduan</h1>
      <v-breadcrumbs :items="pages" large ></v-breadcrumbs>
      <v-alert v-if="errors.length > 0" dismissible type="error">
        <p v-for="(error, i) in errors" :key="i">{{ error }}</p>
        </v-alert>
      <v-card :loading="loading">
        <v-card-text>
            <form ref="form" @submit.prevent="submit">
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
            <v-file-input
                label="Gambar Bukti Berita"
                multiple
                ref="images"
                @change="onFileChange"
                counter
              :rules="rules.required"
                 accept="image/*"
                show-size
                filled
                prepend-icon="mdi-camera"
            ></v-file-input>
            <v-file-input
                label="Video Bukti Berita (opsional)"
                multiple
                ref="video"
                counter
                accept="video/*"
                show-size
                filled
                prepend-icon="videocam"
            ></v-file-input>
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
      postFormData: new FormData(),
      errors: [],
      form: { },
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
          'Content-Type': 'multipart/form-data'
        },
        crossDomain: true,
      };
    },
  },
  methods: {
    async submit() {
        this.loading = true;
        // let formData = new FormData();
        // for( var i = 0; i < this.$refs.images.length; i++ ){
        //     let file = this.$refs.images[i];
        //     console.log(file);
        //     formData.append('images[]', file);
        // }
        this.postFormData.append('video', this.$refs.video);
        this.postFormData.append('title', this.form.title);
        this.postFormData.append('content', this.form.content);
        this.postFormData.append('link', this.form.link);
      await axios
        .post("/user/report/store/" , this.postFormData, this.config)
        .then((response) => {
            this.$toast.success('Berhasil menyimpan aduan berita!');
            this.message = response.data.data.message;
            this.skeleton = false;
            this.loading = false;
            console.log(response.data);
        })
        // .catch((e) => {
        //   this.loading = false;
        //   this.skeleton = false;
        //   console.log(e);
        //   this.errors = e.response.errors;
        // });
    },
     onFileChange(event) {
        for(var key in event.target.files){
            this.postFormData.append('images[]', event.target.files[key]);
        }
    },
  },
}


</script>
