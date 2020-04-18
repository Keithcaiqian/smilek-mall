import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/home/Home.vue'
Vue.use(VueRouter)
const Category = ()=>import('views/category/Category.vue')
const ShopCart = ()=>import('views/shopcart/ShopCart.vue')
const Profile = ()=>import('views/profile/Profile.vue')
const Detail = ()=>import('views/detail/Detail.vue')

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/shopcart',
    component:ShopCart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:id',
    component:Detail
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
