<template>
  <scroll class="content" ref="scroll">
    <div>
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'common/scroll/Scroll'
  import CartListItem from './CartListItem'

	export default {
    name: "CartList",
    props: {
		  cartList: {
		    type: Array,
        default() {
		      return []
        }
      }
    },
    activated(){
      this.$refs.scroll.refresh()
    },
    components: {
		  Scroll, CartListItem
    },
   
	}
</script>

<style scoped>
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
