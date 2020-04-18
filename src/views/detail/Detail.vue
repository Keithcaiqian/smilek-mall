<template>
  <div class="detail">
    <nav-bar class="detail-nav" ref="navBar" @navClick="navClick" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="scroll">
      <detail-swiper :banner="banner" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info ref="goods" :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recomments" :goodsList="goodsDetail" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>
<script>
import navBar from "./childComps/NavBar";
import detailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import scroll from "common/scroll/Scroll.vue";
import goodsList from "content/goodslist/GoodsList.vue";

import { backTopMixin } from "@/common/mixin.js";

import {
  getDetailSwiper,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail.js";

import { debounce } from "@/common/debounce.js";

export default {
  name: "detail",
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      banner: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      goodsDetail: [],
      themeTop: [],
      getThemeTop: null,
      scrollY: 0
    };
  },
  created() {
    this.iid = this.$route.params.id;
    this.getDetailSwiper(this.iid);
    this.getRecommend();
    this.getThemeTop = debounce(() => {
      (this.themeTop = []),
        this.themeTop.push(0),
        this.themeTop.push(-this.$refs.params.$el.offsetTop + 44);
      this.themeTop.push(-this.$refs.comment.$el.offsetTop + 44);
      this.themeTop.push(-this.$refs.recomments.$el.offsetTop + 44);
    }, 500);
  },
  mounted() {
    // console.log(this.$refs.detailScroll)
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    // 监听图片加载完成
    if (this.$route.path.indexOf("/detail") > -1) {
      this.$bus.$on("imgLoad", () => {
        refresh();
      });
    }
  },
  methods: {
    async getDetailSwiper(iid) {
      const { result: data } = await getDetailSwiper(iid);
      // 1.获取顶部的图片轮播数据
      this.banner = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.保存评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    },
    async getRecommend() {
      const { data: res } = await getRecommend();
      this.goodsDetail = res.list;
    },
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTop();
    },
    navClick(index) {
      this.$refs.scroll.scrollTo(0, this.themeTop[index], 0);
    },
    scroll(position) {
      this.isShowBackTop = -position.y > 1000;
      const y = position.y;
      for (let i in this.themeTop) {
        i = i * 1;
        if (
          y < this.themeTop[i] &&
          y > this.themeTop[i + 1] &&
          this.scrollY != i
        ) {
          this.scrollY = i;
          this.$refs.navBar.curIndex = this.scrollY;
        } else if (
          y < this.themeTop[this.themeTop.length - 1] &&
          this.scrollY != this.themeTop.length - 1
        ) {
          this.scrollY = this.themeTop.length - 1;
          this.$refs.navBar.curIndex = this.scrollY;
        }
      }
    },
    addToCart() {
      // 1.创建对象
      const obj = {};
      // 2.对象信息
      obj.iid = this.iid;
      obj.imgURL = this.banner[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.newPrice = this.goods.newPrice;
      // 3，添加到购物车
      this.$store.commit('addCart',obj)
    }
  },
  components: {
    navBar,
    detailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    scroll,
    goodsList,
    DetailBottomBar
  }
};
</script>
<style scoped>
.detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>