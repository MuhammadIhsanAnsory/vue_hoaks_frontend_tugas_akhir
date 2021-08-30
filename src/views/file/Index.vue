<template>
    <div>
        <v-container>
            <h2>Skye School File Manager</h2>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="white" v-bind="attrs" v-on="on" >
                    <v-icon left>sort</v-icon> Urutkan Berdasarkan
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item link @click="sortByName()" v-if="nameAsc">
                        <v-list-item-icon>
                            <v-icon>arrow_downward</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title> Nama </v-list-item-title>
                    </v-list-item>
                    <v-list-item link @click="sortByName()" v-else>
                        <v-list-item-icon>
                            <v-icon>arrow_upward</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title> Nama </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <div class="pb-6">
                <v-card-text class="mt-4">
                    <v-row>
                        <v-col lg="2" md="3" sm="6" v-for="(folder, i) in folders" :key="i">
                            <v-card outlined link  @dblclick="openFolder()" @click="selectFolder(folder.id)" class="text-center pt-3" :color="folder.id == selected ? 'blue lighten-4' : ''" @contextmenu="rightClick($event, folder.id)" @tochstart=" rightClick($event, folder.id)">
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
        <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y min-width="200px">
            <v-list>
                <v-list-item link @click="openFolder()">
                    <v-list-item-title>Buka</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-title>Salin</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-title>Hapus</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
export default {
  metaInfo: { title: 'Buku' },
  data () {
      return {
          selected: null,
          nameAsc: true,
          showMenu: false,
          x: 0,
        y: 0,
          folders: [
              {
                  id: 1,
                  name: 'gBuku Paket IPA Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2014/08/16/18/17/book-419589_960_720.jpg',
                  desc: 'Buku paket IPA kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id: 2,
                  name: 'eBuku Paket Bahasa Indonesia Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2017/06/10/16/22/coffee-2390136_960_720.jpg',
                  desc: 'Buku paket B. Indonesia kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id: 3,
                  name: 'jBuku Paket Matematika Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2015/11/19/21/14/glasses-1052023_960_720.jpg',
                  desc: 'Buku paket Matematika kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id: 4,
                  name: 'aBuku Paket Sejarah Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2015/11/19/21/11/book-1052014_960_720.jpg',
                  desc: 'Buku paket Sejarah kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id: 5,
                  name: 'cBuku Paket Seni Budaya Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2018/07/01/20/01/music-3510326_960_720.jpg',
                  desc: 'Buku paket Seni Budaya kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id: 6,
                  name: 'bBuku Paket Bahasa Sunda Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2019/02/15/11/04/book-3998252_960_720.jpg',
                  desc: 'Buku paket Bahasa Sunda kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id: 7,
                  name: 'gBuku Paket IPA Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2014/08/16/18/17/book-419589_960_720.jpg',
                  desc: 'Buku paket IPA kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id:8,
                  name: 'eBuku Paket Bahasa Indonesia Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2017/06/10/16/22/coffee-2390136_960_720.jpg',
                  desc: 'Buku paket B. Indonesia kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id: 9,
                  name: 'jBuku Paket Matematika Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2015/11/19/21/14/glasses-1052023_960_720.jpg',
                  desc: 'Buku paket Matematika kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id: 10,
                  name: 'aBuku Paket Sejarah Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2015/11/19/21/11/book-1052014_960_720.jpg',
                  desc: 'Buku paket Sejarah kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id: 11,
                  name: 'cBuku Paket Seni Budaya Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2018/07/01/20/01/music-3510326_960_720.jpg',
                  desc: 'Buku paket Seni Budaya kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id: 12,
                  name: 'bBuku Paket Bahasa Sunda Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2019/02/15/11/04/book-3998252_960_720.jpg',
                  desc: 'Buku paket Bahasa Sunda kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id: 13,
                  name: 'aBuku Paket Sejarah Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2015/11/19/21/11/book-1052014_960_720.jpg',
                  desc: 'Buku paket Sejarah kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id: 14,
                  name: 'cBuku Paket Seni Budaya Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2018/07/01/20/01/music-3510326_960_720.jpg',
                  desc: 'Buku paket Seni Budaya kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id: 15,
                  name: 'bBuku Paket Bahasa Sunda Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2019/02/15/11/04/book-3998252_960_720.jpg',
                  desc: 'Buku paket Bahasa Sunda kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id: 16,
                  name: 'bBuku Paket Bahasa Sunda Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2019/02/15/11/04/book-3998252_960_720.jpg',
                  desc: 'Buku paket Bahasa Sunda kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id: 17,
                  name: 'aBuku Paket Sejarah Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2015/11/19/21/11/book-1052014_960_720.jpg',
                  desc: 'Buku paket Sejarah kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id: 18,
                  name: 'cBuku Paket Seni Budaya Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2018/07/01/20/01/music-3510326_960_720.jpg',
                  desc: 'Buku paket Seni Budaya kelas 7 dari Disdik Jabar',
                  selected: false,
              },
              {
                  id: 19,
                  name: 'bBuku Paket Bahasa Sunda Kelas 7',
                  image: 'https://cdn.pixabay.com/photo/2019/02/15/11/04/book-3998252_960_720.jpg',
                  desc: 'Buku paket Bahasa Sunda kelas 7 dari Disdik Jabar',
                  selected: false,
              },
          ],
          
      }
  },
  methods: {
      openFolder(){
          return this.$router.push(`/file/${this.selected}`)
      },
      selectFolder(id){
        this.selected = id;
      },
      sortByName(){
        var asc = this.nameAsc;
        function compare(a, b) {
            if(asc){
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                let compareVal = 0;
    
                if (nameA > nameB) compareVal = 1;
                else if (nameA < nameB) compareVal = -1;
                return compareVal;
            }else{
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                let compareVal = 0;
    
                if (nameA < nameB) compareVal = 1;
                else if (nameA > nameB) compareVal = -1;
                return compareVal;

            }
        }
        this.nameAsc = !this.nameAsc; 
        this.folders.sort(compare)
      },
      show(e){
          e.preventDefault()
          console.log(e);
        this.showMenu = false
        this.x = e.clientX
        this.y = e.clientY
        this.$nextTick(() => {
          this.showMenu = true
        })
      },
      rightClick(e, id){
        this.selected = id;
        e.preventDefault()
        this.showMenu = false
        this.x = e.clientX
        this.y = e.clientY
        this.$nextTick(() => {
          this.showMenu = true
        })
      },
  }

}
</script>