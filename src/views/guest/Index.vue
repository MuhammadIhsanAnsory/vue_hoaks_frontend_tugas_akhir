<template>
  <div>
      <v-row>
          <v-col lg="8" sm="12">
            <v-carousel cycle hide-delimiter-background height="440px">
                <v-carousel-item
                v-for="(item,i) in images"
                :key="i"
                :src="item.src"
                reverse-transition="fade-transition"
                transition="fade-transition"
                ></v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col lg="4" sm="12">
              <v-row>
                <v-col cols="12">
                    <v-img src="https://cdn.pixabay.com/photo/2020/07/10/14/11/fake-news-5390815_960_720.jpg" height="240px" width="100%"></v-img>
                </v-col>
                <v-col cols="6">
                    <v-img src="https://cdn.pixabay.com/photo/2020/07/10/14/11/fake-news-5390815_960_720.jpg" height="175" width="100%"></v-img>
                </v-col>
                <v-col cols="6">
                    <v-img src="https://cdn.pixabay.com/photo/2021/02/22/01/48/fake-news-6038455_960_720.png" height="175"  width="100%"></v-img>
                </v-col>

              </v-row>
          </v-col>
      </v-row>
    <v-container>
        <h1>Selamat Datang di HS Saber</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem corrupti soluta debitis assumenda? Harum, a explicabo. Vel recusandae, minima deleniti commodi, dolorem repudiandae eveniet animi nam a corrupti, nulla sunt.</p>
        <h2>Siapa Kami?</h2>
    </v-container>
  </div>
</template>

<script>
export default {
    data(){
        return {
            images: [
                {
                    src: 'https://cdn.pixabay.com/photo/2020/02/26/11/24/fake-news-4881486_960_720.jpg',
                },
                {
                    src: 'https://cdn.pixabay.com/photo/2020/02/26/11/24/fake-news-4881488_960_720.jpg',
                },
                {
                    src: 'https://cdn.pixabay.com/photo/2014/11/05/04/20/news-517380_960_720.jpg',
                },
                {
                    src: 'https://cdn.pixabay.com/photo/2020/05/30/09/52/wrong-messages-5238319_960_720.jpg',
                },
            ],
        }
    }
}
</script>
