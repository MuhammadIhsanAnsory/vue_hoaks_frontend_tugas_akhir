<template>
  <div>
    <v-app-bar color="grey lighten-5">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <h2>HS SABER</h2>
        <v-spacer></v-spacer>
        <v-menu offset-y bottom transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>account_circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="() => {}">
            <v-list-item-title class="font-weight-bold">Halo, {{ user.name }}!</v-list-item-title>
          </v-list-item>
          <v-list-item @click="dialog = true">
            <v-list-item-icon>
              <v-icon>exit_to_app</v-icon>
            </v-list-item-icon>
            <v-list-item-title text>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    
    <!-- navigasi -->
    <v-navigation-drawer v-model="drawer" absolute
      temporary dark color="#2d3142">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            HS SABER
          </v-list-item-title>
          <v-list-item-subtitle>
              
          </v-list-item-subtitle>

        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item link to="/panel/aduan">
          <v-list-item-icon>
            <v-icon>dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      </v-list>
      

      <template v-slot:append>
        <div class="pa-2">
            <div class="text-center">
                <v-btn icon @click="drawer = false">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
            </div>
        </div>
      </template>
    </v-navigation-drawer>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">LOGOUT</v-card-title>

        <v-card-text class="mt-5">Anda yakin logout?</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="dialog = false">Kembali</v-btn>
           <v-btn color="error" text @click="logoutButton()">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data (){
        return {
            drawer: false, 
            dialog: false,
        }
    },
    computed: {
    user(){
      if(this.$store.state.auth.user === null){
        return false
      }else if(this.$store.state.auth.user.user === null){
        return false
      }else{
        return this.$store.state.auth.user.user;
      }
    }
  },
  methods: {
    ...mapActions({
      logout: "auth/logout"
    }),
    logoutButton() {
      this.logout().then(() => {
        this.$router
          .push({
            name: "guest.index"
          })
          .catch(e => {
            return e;
          });
      });
    }
  }
}
</script>