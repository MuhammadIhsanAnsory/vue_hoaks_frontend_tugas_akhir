<template>
  <v-app>
    <NavbarGuest  v-if="$router.currentRoute.name.startsWith('guest')"></NavbarGuest> 
    <NavbarUser v-if="$router.currentRoute.name.startsWith('user')"></NavbarUser>
    <NavbarAdmin v-if="$router.currentRoute.name.startsWith('admin')"></NavbarAdmin>
    <v-main>
      <router-view/>
      <vue-confirm-dialog></vue-confirm-dialog>
    </v-main>
    <Footer  v-if="$router.currentRoute.name.startsWith('guest')"></Footer> 
  </v-app>
</template>

<script>
import Vue from 'vue';
import VueMeta from  'vue-meta';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import VueConfirmDialog from "vue-confirm-dialog";

import NavbarGuest from './components/NavbarGuest.vue';
import NavbarUser from './components/NavbarUser.vue';
import NavbarAdmin from './components/NavbarAdmin.vue';
import Footer from './components/Footer.vue';

Vue.use(VueMeta); 
Vue.use(VueToast, {
  position: 'top-right',
  duration: 4000,
});
Vue.use(VueConfirmDialog);
Vue.component("vue-confirm-dialog", VueConfirmDialog.default);

export default {
  name: 'App',
  metaInfo: {
    titleTemplate: '%s - HS SABER',
  },
  components: {NavbarGuest, NavbarUser, NavbarAdmin, Footer},
};
</script>
<style>
  a{
    text-decoration: none;
}
</style>
