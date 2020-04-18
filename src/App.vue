<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view></router-view>
    </keep-alive>
    <tab-bar />
  </div>
</template>
<script>
import tabBar from 'content/tabbar/tabbar.vue'
export default {
  components:{
    tabBar
  }
}
</script>
<style>
@import 'assets/css/base.css';
  #app{
    width: 100%;
    height: 100vh;
  }
</style>
