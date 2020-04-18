<template>
  <div class="home">
    <nav-bar :navStyle="navStyle" class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      ref="tabControl1"
      class="top-tab"
      v-show="isShowTopTapControl"
      :tabControlData="tabControlData"
      @tabClick="tabClick"
    />
    <scroll
      class="wrapper"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <swiper :banner="banner" @imgLoad="imgLoad" />
      <homeNavImg :recommend="recommend" />
      <feature />
      <tab-control
        ref="tabControl"
        class="tab-control"
        :tabControlData="tabControlData"
        @tabClick="tabClick"
      />
      <goods-list :goodsList="goods[curTabControl].list" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>
<script>
import navBar from "common/navbar/NavBar.vue";
import scroll from "common/scroll/Scroll.vue";

import swiper from "./childComps/Swiper";
import homeNavImg from "./childComps/NavImg";
import feature from "./childComps/Feature";

import tabControl from "content/tabcontrol/TabControl.vue";
import goodsList from "content/goodslist/GoodsList.vue";
import backTop from "content/backtop/BackTop.vue";

import { debounce } from "@/common/debounce.js";

import { getHomeData, getHomeGoods } from "network/home.js";
export default {
  data() {
    return {
      navStyle: { backgroundColor: "#ff8198", color: "#fff" },
      banner: [],
      recommend: [],
      tabControlData: ["流行", "精选", "新款"],
      curTabControl: "pop",
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      isShowBackTop: false,
      tapControlTop: null,
      isShowTopTapControl: false,
      saveY: null
    };
  },
  created() {
    //  请求swiper和banner数据
    this.getHomeData();

    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,500);
    // 监听图片加载完成
    if (this.$route.path.indexOf("/home") > -1) {
      this.$bus.$on("imgLoad", () => {
        refresh();
      });
    }
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getTabTop();
  },
  methods: {
    /**
     * 事件
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.curTabControl = "pop";
          break;
        case 1:
          this.curTabControl = "new";
          break;
        case 2:
          this.curTabControl = "sell";
          break;
      }
      this.$refs.tabControl.curIndex = index;
      this.$refs.tabControl1.curIndex = index;
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;

      this.isShowTopTapControl = -position.y > this.tapControlTop;
    },
    loadMore() {
      this.getHomeGoods(this.curTabControl);
    },
    imgLoad() {
      this.tapControlTop = this.$refs.tabControl.$el.offsetTop;
    },
    /**
     * 网络请求
     */
    getHomeData() {
      getHomeData().then(res => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    async getHomeGoods(type) {
      const { data: res } = await getHomeGoods(type, this.goods[type].page);
      this.goods[type].list.push(...res.list);
      this.goods[type].page++;
      this.$refs.scroll.finishPullUp();
    }
  },
  components: {
    navBar,
    swiper,
    homeNavImg,
    feature,
    tabControl,
    goodsList,
    scroll,
    backTop
  }
};
</script>
<style scoped>
.home {
  position: relative;
  height: 100vh;
}
.home .tab-control {
  /* position: sticky;
  top: 44px; */
  background-color: #fff;
}
.home .wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.top-tab {
  position: relative;
  z-index: 10;
}
</style>