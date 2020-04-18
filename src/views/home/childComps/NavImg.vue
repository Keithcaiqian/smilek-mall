<template>
    <div class="home-navimg">
        <a class="home-navimg-item" v-for="(item,index) in recommend" 
        :key="index"
        :href="item.link">
            <img :src="item.image" alt="">
            <div>{{item.title}}</div>
        </a>
    </div>
</template>
<script>
export default {
    props:{
        recommend:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>
<style scoped>
    .home-navimg{
        display: flex;
        width: 100%;
        text-align: center;
        padding: 20px 0 30px;
        border-bottom: 10px solid #eee;
    }
    .home-navimg-item{
        flex: 1;
    }
    .home-navimg-item img{
        width: 85%;
    }
</style>