<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <slot />
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
// vue-awesome-swiper 轮播图插件
// 在父组件使用时还需要引入SwiperSlide import { SwiperSlide } from "vue-awesome-swiper"
import { Swiper, directive } from "vue-awesome-swiper";

import "swiper/css/swiper.css";
export default {
  props:{
    isAutoPlay:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        },
        loop:true,
        autoplay:true
        // Some Swiper option/callback...
      }
    };
  },
  watch:{
    isAutoPlay(){
      this.swiperOptions.autoplay = this.isAutoPlay
      this.swiperOptions.loop = this.isAutoPlay
    }
  },
  components: {
    Swiper
  }
};
</script>

<style scoped>
</style>