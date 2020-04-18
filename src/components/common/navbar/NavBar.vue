<template>
    <div class="nav-bar" :style="navStyle">
        <div class="nav-left" :style="leftStyle">
            <slot name="left"></slot>
        </div>
        <div class="nav-center" :style="centerStyle">
            <slot name="center"></slot>
        </div>
        <div class="nav-right" :style="rightStyle">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        navStyle:{
            type:Object,
        },
        leftStyle:{
            type:Object,
        },
        centerStyle:{
            type:Object
        },
        rightStyle:{
            type:Object
        }
    }
}
</script>
<style scoped>
    .nav-bar{

        width: 100%;
        line-height: 44px;
        height: 44px;
        display: flex;
        box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
        text-align: center;
    }
    .nav-left,.nav-right{
        width: 60px;
    }
    .nav-center{
        flex: 1;
    }
</style>