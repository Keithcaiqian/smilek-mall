<template>
    <div class="shopCart">
        <nav-bar class="cart-navbar"><div slot="center">购物车({{cartInfoLength}})</div></nav-bar>
        <cart-list class="cart-list" :cart-list="cartList"></cart-list>
    </div>
</template>
<script>
import CartList from './childComps/CartList'

import navBar from 'common/navbar/NavBar.vue'

import { mapGetters } from 'vuex'
export default {
    components:{
        navBar,
        CartList
    },
    computed:{
        ...mapGetters(['cartInfoLength','cartList'])
    }
}
</script>
<style scoped>
    .shopCart{
        height: 100vh;
    }
    .cart-navbar{
        background-color: var(--color-tint);
        color: #fff;
        font-weight: 700;
        font-size: 18px;
    }
    .cart-list {
        position: absolute;
        top: 44px;
        bottom: 49px;
        width: 100%;
    }
</style>