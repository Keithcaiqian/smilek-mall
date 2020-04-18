<template>
    <div class="home-goods-list">
        <goods-list-item v-for="(item,index) in goodsList" 
        :key="index" 
        :goodsItem='item'></goods-list-item>
    </div>
</template>
<script>
import goodsListItem from './GoodsListItem'
export default {
    props:{
        goodsList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        goodsListItem
    }
}
</script>
<style scoped>
    .home-goods-list{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 2px;
        box-sizing: border-box;
        justify-content: space-around;
        font-size: 14px;
    }
</style>