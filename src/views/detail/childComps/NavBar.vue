<template>
    <div class="detail-nav-bar">
        <nav-bar>
            <div slot="left" class="detail-left" @click="back">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="detail-center">
                <div class="detail-item" 
                :class="{active:index===curIndex}" 
                @click="changeIndex(index)"
                v-for="(item,index) in navList" 
                :key="index">
                    {{item}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>
<script>
import navBar from 'common/navbar/NavBar.vue'
export default {
    data(){
        return{
            navList:['商品','参数','评论','推荐'],
            curIndex:0
        }
    },
    methods:{
        changeIndex(index){
            this.curIndex = index
            this.$emit('navClick',index)
        },
        back(){
            this.$router.back()
        }
    },
    components:{
        navBar
    }
}
</script>
<style scoped>
    .detail-center{
        display: flex;
        font-size: 14px;
    }
    .detail-item{
        flex: 1;
    }
    .active{
        color: var(--color-high-text);
    }
    .detail-left{
        height: 100%;
        display: flex;
        justify-content: center;
    }
</style>