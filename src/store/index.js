import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartInfo:[]
  },
  getters:{
    cartInfoLength(state){
      return state.cartInfo.length
    },
    cartList(state) {
      return state.cartInfo
    }
  },
  mutations: {
    addCart(state,payload){
      const oldInfo = state.cartInfo.find(item=>item.iid == payload.iid)

      if(oldInfo){
        oldInfo.count += 1;
      }else{
        payload.count = 1
        state.cartInfo.push(payload)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
