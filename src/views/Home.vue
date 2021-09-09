<template>
  <div class="home">
    <top-nav></top-nav>
    <carousel></carousel>
    <iconList></iconList>
    <musicList></musicList>
  </div>
</template>

<script>
 
import topNav from '@/components/topNav.vue'
import carousel from '@/components/carousel.vue'
import iconList from '@/components/iconList.vue'
import musicList from '@/components/musicList.vue'
export default {
  name: 'Home',
  components: {
   topNav,
   carousel,
   iconList,
   musicList
  },
  data() {
    return {
    }
  },
  computed: {
  },
 
}
</script>

<style lang="less" scoped>
  
  /* <div id="d1">
      <span class="iconfont icon-gedan"></span><!-- 歌单 -->
      <span class="iconfont icon-sousuo"></span><!-- 搜索 -->
      <span class="iconfont icon-liebiao"></span><!-- 列表1 -->
      <span class="iconfont icon-bofang"></span><!-- 播放 -->
      <span class="iconfont icon-iconfront-"></span><!-- 暂停 -->
      <span class="iconfont icon-airec"></span><!-- 推荐 -->
      <span class="iconfont icon-paihangbang"></span><!-- 排行榜 -->
      <span class="iconfont icon-liebiao1"></span><!-- 列表2 -->
    </div> */

  
</style>

