<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item,index) in tabControlData"
      :key="item"
      :class="{active:index===curIndex}"
      @click="changeIndex(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabControlData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      curIndex: 0
    };
  },
  methods:{
      changeIndex(index){
          this.curIndex = index
          this.$emit('tabClick',index)
      }
  }
};
</script>
<style scoped>
.tab-control {
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span{
    padding: 5px;
}
.active{
    color: red;
}
.active span{
    border-bottom: 3px solid red;
}
</style>