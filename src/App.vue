<template>
  <v-app>
    <NavbarGuest  v-if="$router.currentRoute.name.startsWith('guest')"></NavbarGuest> 
    <NavbarUser v-if="$router.currentRoute.name.startsWith('user')"></NavbarUser>
    <NavbarAdmin v-if="$router.currentRoute.name.startsWith('admin')"></NavbarAdmin>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue';
import VueMeta from  'vue-meta';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import NavbarGuest from './components/NavbarGuest.vue';
import NavbarUser from './components/NavbarUser.vue';
import NavbarAdmin from './components/NavbarAdmin.vue';

Vue.use(VueMeta); 
Vue.use(VueToast, {
  position: 'top-right',
  duration: 4000,
});
export default {
  name: 'App',
  metaInfo: {
    titleTemplate: '%s - HS SABER',
  },
  components: {NavbarGuest, NavbarUser, NavbarAdmin},
};
</script>
