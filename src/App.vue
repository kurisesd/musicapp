<template>
  <div>
    <router-view/>
    <playController></playController>
  </div>
</template>

<script>
import playController from '@/components/playController.vue'
export default {
  name:'App',
  components:{
    playController
  },
  mounted(){
    let userData = JSON.parse(localStorage.userData);
    this.$store.commit('setUser',userData)
  }
}
</script>
<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: '微软雅黑';
}
a{
  color: #333;
  text-decoration: none;
}
</style>
