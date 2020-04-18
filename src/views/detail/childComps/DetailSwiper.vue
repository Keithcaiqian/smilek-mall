<template>
  <div>
    <home-swiper class="detail-swiper" :isAutoPlay='isAutoPlay'>
      <swiper-slide v-for="(item,index) in banner" :key="index">
          <img :src="item" alt="">
      </swiper-slide>
    </home-swiper>
  </div>
</template>
<script>
import { SwiperSlide } from "vue-awesome-swiper";
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
  data(){
    return{
      isAutoPlay:true
    }
  },
  watch:{
    banner(){
      this.isAutoPlay = this.banner.length>1
    }
  },
  components: {
    SwiperSlide,
    homeSwiper
  }
};
</script>
<style scoped>
.detail-swiper{
    height: 300px;
}
img{
    width: 100%;
}
</style>