<template>
    <div>
        <v-container>
            <h2>Skye School File Manager</h2>
            <v-breadcrumbs divider="/" :items="items"></v-breadcrumbs>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="white"  v-bind="attrs" v-on="on" >
                     <v-icon left>sort</v-icon> Urutkan Berdasarkan
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item link @click="sortByName()">
                        <v-list-item-icon>
                            <v-icon>arrow_downward</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title> Nama </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <div class="pb-6">
                <v-card-text class="mt-4">
                    <v-row>
                        <v-col lg="2" md="3" sm="6" v-for="(folder, i) in folders" :key="i">
                            <v-card outlined link  @dblclick="openFolder(folder)" @click="selectFolder(folder.id)" class="text-center pt-3" :color="folder.id == selected ? 'blue lighten-3' : ''">
                                <v-icon x-large color="amber">folder</v-icon>
                                <v-card-text>
                                    <p>{{ folder.name }}</p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
  metaInfo: { title: 'Buku' },
  data () {
      return {
          folders: [
              {
                  id: 1,
                  name: 'Buku Paket IPA Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2014/08/16/18/17/book-419589_960_720.jpg',
                  desc: 'Buku paket IPA kelas 7 dari Disdik Jabar',
                  selected: false,
              },
          ],
          items: [
              {
                  text: 'File Manager',
                  disabled: false,
                  to: '/file',
                  exact: true,
              },
              {
                  text: 'Detail Folder',
                  disabled: true,
                  to: '/file',
                  exact: true,
              },
          ],
          selected: null
      }
  },
  methods: {
      openFolder(folder){
          console.log(folder.name);
      },
      selectFolder(id){
        this.selected = id;
      },
      sortByName(){
        function compare(a, b) {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            let compareVal = 0;

            if (nameA > nameB) compareVal = 1;
            else if (nameA < nameB) compareVal = -1;
            return compareVal;
        }
        this.folders.sort(compare)

      }
  }

}
</script>