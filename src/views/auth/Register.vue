<template>
  <div>
    <div class="bg-gradient py-10">
        <v-card class="mx-auto" width="600px" max-width="90%" outlined :loading="loading">
          <v-img src="https://cdn.pixabay.com/photo/2017/02/25/10/11/hoax-2097365_960_720.jpg" width="100%"></v-img>
          <div class="text-center">
            <h1>Register</h1>
          </div>
          <v-card-text>
            <form @submit.prevent="submit" lazy-validation >

                <v-text-field
                    v-model="form.name"
                    :disabled="loading"
                    :rules="[rules.required,rules.name_min,rules.name_max]"
                    label="Nama Lengkap"
                ></v-text-field>
                <v-text-field v-model="form.email" :disabled="loading" :rules="emailRules" label="E-mail" required ></v-text-field>

                <v-text-field
                    v-model="form.password"
                    :disabled="loading"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required,rules.min,rules.max]"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-text-field
                    v-model="form.password_confirmation"
                    :disabled="loading"
                    :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required,rules.min,rules.max]"
                    :type="showPassword2 ? 'text' : 'password'"
                    label="Konfirmasi Password"
                    @click:append="showPassword2 = !showPassword2"
                ></v-text-field>
                <v-text-field
                    v-model="form.phone"
                    :disabled="loading"
                    :rules="[rules.required,rules.min,rules.phone_max]"
                    label="Nomor Telpon / Whatsapp"
                ></v-text-field>
                <v-text-field
                    v-model="totalAnswer"
                    :disabled="loading"
                    :rules="[rules.required]"
                    :label="`${numb1} + ${numb2} `"
                ></v-text-field>
                <v-btn
                  color="blue darken-3"
                  dark
                  block
                  type="submit"
                  :disabled="loading"
                  :loading="loading"
                >
                  Register
                </v-btn>
              </form>
              <p class="text-center mt-10">Sudah punya akun?</p>
              <v-btn
                  color="green"
                  dark
                  block
                  class="mt-4"
                  :disabled="loading"
                  :loading="loading"
                  to="/login"
                >
                  Login
                </v-btn>
          </v-card-text>
        </v-card>
      <div class="pb-10"></div>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

  export default {
    name: 'Home',
    metaInfo: { title: 'Login' },
    data(){
    return{
      errors: [],
      loading: false,
      skeleton: true,
      showPassword: false,
      showPassword2: false,
      numb1: null,
      numb2: null,
      total: null,
      totalAnswer: 0,
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
      },
      rules: {
        required: value => !!value || 'Wajib diisi.',
        name_min: v => v.length >= 3 || 'Minimal 3 karakter',
        name_max: v => v.length <= 24 || 'Maksimal 24 karakter',
        min: v => v.length >= 6 || 'Minimal 6 karakter',
        max: v => v.length <= 16 || 'Maksimal 16 karakter',
        phone_max: v => v.length <= 14 || 'Maksimal 14 karakter',
        emailMatch: () => (`Masukkan email yang valid`),
      },
      emailRules: [
        v => !!v || 'E-mail harus diisi',
        v => /.+@.+\..+/.test(v) || 'Masukkan email yang valid',
      ], 
    
    }
  },
  methods:{
    ...mapActions({
      register: 'auth/register'
    }),
    submit(){
      this.errors = []
      if(this.total == this.totalAnswer){
        this.loading = true
        this.register(this.form).then(() => {
           this.$toast.success("Berhasil register, silahkan login") 
          this.$router.push({
              name: "user.dashboard"
            });
        }).catch(e => {
          this.loading = false
          console.log(e);
          this.errors = e.response.data.errors
        })
      }else{
        this.numb1 = Math.floor(Math.random() * 60)
        this.numb2 = Math.floor(Math.random() * 60)
        this.total = this.numb1 + this.numb2
          this.errors.push("Penjumlahan salah")
      }
    },
  
  },
  created(){
    this.numb1 = Math.floor(Math.random() * 60)
    this.numb2 = Math.floor(Math.random() * 60)
    this.total = this.numb1 + this.numb2
    this.skeleton = false;
  }

  }
</script>

<style>
  .bg-gradient{
    background: #2980B9;  
    background: -webkit-linear-gradient(-135deg, #FFFFFF, #6DD5FA, #3e9bda); 
    background: linear-gradient(-135deg, #FFFFFF, #6DD5FA, #2980B9); 
    min-height: 100vh;

  }
</style>
