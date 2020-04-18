<template>
  <!-- <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide v-for="(item,index) in banner" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt @load="imgLoad"/>
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>-->
    <home-swiper :banner="banner" class="swiper">
      <swiper-slide v-for="(item,index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt @load="imgLoad" />
        </a>
      </swiper-slide>
    </home-swiper>
</template>

<script>
// vue-awesome-swiper 轮播图插件
import { SwiperSlide } from "vue-awesome-swiper";
// import "swiper/css/swiper.css";
import homeSwiper from "common/swiper/Swiper.vue";
export default {
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      // swiperOptions: {
      //   pagination: {
      //     el: ".swiper-pagination"
      //   },
      //   loop: true,
      //   autoplay: true
      //   // Some Swiper option/callback...
      // },
      // isImgLoad: false
    };
  },
  methods: {
    imgLoad() {
      if (this.isImgLoad) {
        return;
      }
      this.isImgLoad = true;
      this.$emit("imgLoad");
    }
  },
  components: {
    homeSwiper,
    // Swiper,
    SwiperSlide
  }
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 195px;
}
img {
  width: 100%;
  height: auto;
}
</style>