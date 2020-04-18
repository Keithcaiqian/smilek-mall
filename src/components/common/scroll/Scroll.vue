<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            scroll:null
        }
    },
    mounted(){
            this.scroll = new BScroll(this.$refs.wrapper,{
                click: true,
                probeType:this.probeType,
                pullUpLoad:this.pullUpLoad
            })
            this.scroll.on('scroll',position=>{
                this.$emit('scroll',position)
            })
            if(this.pullUpLoad){
                this.scroll.on('pullingUp',()=>{
                    this.$emit('pullingUp')
                 })
            } 
    },
    methods:{
        scrollTo(x,y,time=500){
            this.scroll.scrollTo(x,y,time)
        },
        refresh(){
            this.scroll.refresh()
        },
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        getTabTop(){
            return this.scroll.y
        }
    }
}
</script>
<style scoped>
</style>