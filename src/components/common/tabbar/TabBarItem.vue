<template>
  <div class="tab-bar-item" @click="toTabBar">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="isActiveColor">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'red'
        }
    },
    data(){
        return {
            // isActive:true
        }
    },
    computed:{
        isActive(){
            return this.$route.path.indexOf(this.path)>-1
        },
        isActiveColor(){
            return this.isActive?{color:this.activeColor}:{}
        }
    },
    methods:{
        toTabBar(){
            if(this.$route.path===this.path){
              return
            }
            this.$router.replace(this.path)
        }
    }
};
</script>

<style>
.tab-bar-item {
  text-align: center;
  flex: 1;
  font-size: 14px;
}
.tab-bar-item img {
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
  width: 24px;
  height: 24px;
}
</style>