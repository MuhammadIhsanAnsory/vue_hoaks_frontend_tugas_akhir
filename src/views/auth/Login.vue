<template>
  <div>
    <div class="bg-gradient">
      <div class="pt-10"></div>
        <v-card class="mx-auto" width="600px" max-width="90%" outlined :loading="loading">
          <v-img src="https://cdn.pixabay.com/photo/2017/02/25/10/11/hoax-2097365_960_720.jpg" width="100%"></v-img>
          <div class="text-center">
            <h1>Login</h1>
          </div>
          <v-alert v-if="error" dismissible type="error">
            <p>Email atau password salah!</p>
          </v-alert>
          <v-alert v-if="message" type="error">
            <p>{{ message }}</p>
          </v-alert>
          <v-form @submit.prevent="submit" lazy-validation>
            <v-card-text>
                <v-text-field label="Email" :rules="rules.emailRules" v-model="form.email" :loading="loading" :disabled="disabled"></v-text-field>
                <v-text-field
                  v-model="form.password"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="rules.required"
                  :type="showPass ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password" 
                  :loading="loading"
                  :disabled="disabled"
                  @click:append="showPass = !showPass"
                ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn block dark type="submit" color="blue darken-3">Login</v-btn>
            </v-card-actions>
              <p class="mt-4 text-center">Belum Punya Akun?</p>
            <v-card-actions>
              <v-btn block dark class="mt-3" color="green" link to="/register">register</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
  export default {
    name: 'Home',
    metaInfo: { title: 'Login' },
    data(){
      return{
        disabled: false,
        loading: false,
        showPass: false,
        form:{
          email: '',
          password: '',
        },
        rules: {
          required: [value => !!value || 'Password harus diisi'],
          emailRules: [
            v => !!v || "E-mail harus diisi",
            v => /.+@.+\..+/.test(v) || "Masukkan email yang valid"
          ]
        },
        error: "",
        message: "",
      }
    },
    methods: {
      ...mapActions({
        login: "auth/login"
      }),
      submit(){
        this.error = "";
        this.loading = true;
        this.login(this.form)
        .then(() => {
          this.$router.push({
            name: "user.dashboard"
          });
        })
        .catch(e => {
          this.loading = false;
          this.message = e.response.data.error;
        });
      }
    },
    created(){
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
