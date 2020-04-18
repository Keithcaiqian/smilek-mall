<template>
  <div class="goods-item" @click="toDetail">
      <img :src="showImg" alt @load="imgLoad"/>
      <div class="detail">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="cfav">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed:{
      showImg(){
          return this.goodsItem.image || this.goodsItem.show.img 
      }
  },
  methods:{
      imgLoad(){
          this.$bus.$emit('imgLoad')
      },
      toDetail(){
          this.$router.push('/detail/'+this.goodsItem.iid)
      }
  }
};
</script>
<style scoped>
    .goods-item{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 48%;
        margin-bottom: 10px;
    }
    .goods-item img{
        width: 100%;
        border-radius: 5px;
    }
    .goods-item .detail{
        margin-top: 5px;
    }
    .goods-item p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .goods-item div{
        text-align: center;
    }
    .goods-item .price{
        color: pink;
        margin-right: 20px;
    }
    .goods-item .cfav{
        position: relative;
    }
    .goods-item .cfav::before{
        content: '';
        position: absolute;
        left: -15px;
        top: 0;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    }
</style>