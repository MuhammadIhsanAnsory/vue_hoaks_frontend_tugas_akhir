# ADUAN BERITA HOAX

Ini merupakan aplikasi frontend Aduan Berita Hoax. Yaa fiturnya sih ga wah banget sih, berikut fiturnya :
- Landing Page
- List Aduan Berita yang telah diklarifikasi admin (pihak berwenang untuk menilai kebenaran berita)
- Pencarian berita dengan keyword
- Register, login user
- Untuk masyarakat bisa mengadukan berita dan melihat status aduannya
- Untuk admin bisa melakukan klarifikasi aduan berita
- User management (blokir dan buka blokir doang sih admin mah hehe)
- SPA tentunya :D
- Menggunakan API dari backend laravel, ini link githubnya : https://github.com/MuhammadIhsanAnsory/laravel_hoaks_backend_tugas_akhir
- dll

Jangan lupa jalankan dulu backend nya, biar bisa jalan dong API nya xixixi

Sebenernya mau tambahin fitur upload file (gambar atau video) ke AWS S3 (walaupun saya beli di Bitbucket Neo S3), tapi karena mepet waktu buat tugas akhir jadi disimpan dilocal aja dulu hehe :D

Dan aplikasi ini mengimplementasikan user role yang mana setiap role memiliki tugas dan fungsinya masing2. Rolenya itu ada 2, yaitu :
- User  =   > Mengadukan berita yang dianggap bermasalah (hoax) dengan mengisi form aduan beserta bukti berupa gambar atau video dan link nya
            > User bisa melihat status aduan, apakah sudah diklarifikasi admin atau belum 

- Admin =   > manajemen user (menambah, memblokir)
            > melihat aduan yang dilakukan oleh masyarakat
            > untuk melakukan klarifikasi dari setiap aduan masyarakat

Kalo ada kritik, saran, dan pertanyaan silahkan kontak saya saja melalui sosial media saya :
- Instagram : <a href="https://instagram.com/muhammadihsanansory_">@muhamadihsanansory_</a>
- Facebook : Muhamad Ihsan Ansory

Jgn lupa follow dan berikan star nya yaaa... 
- Github : <a href="https://github.com/MuhammadIhsanAnsory">https://github.com/MuhammadIhsanAnsory</a>

Terimakasih buanyaakk 

## Komposisi :D
- Vue
- Vuetify
- Vuex



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
