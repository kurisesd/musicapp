<template>
  <div>
    <div class="swiperCom">
      <div class="swiper-container" id="swiperIndex">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in imgs" :key="index">
            <img :src="item.pic" >
          </div>
        </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      
      <!-- 如果需要导航按钮 -->
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div> -->
      
      <!-- 如果需要滚动条 -->
    <!--  <div class="swiper-scrollbar"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css' 
import Swiper from 'swiper'; 
import {getBanner} from '@/api/index.js'

export default {
    name:'swiper',
    data(){
      return{
        imgs:[
          {pic: require('../assets/img/swiper1.jpg')},
          {pic: require('../assets/img/swiper2.jpg')},
          {pic: require('../assets/img/swiper3.jpg')}
        ]
      }
    },
    components:{
        Swiper,
    },
    async mounted(){
      var mySwiper = new Swiper('#swiperIndex',{
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable:true,
        },
        /* // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // 如果需要滚动条
        scrollbar: {
          el: '.swiper-scrollbar',
        }, */
      })
      //从后端获取轮播图并渲染出来
      let res = await getBanner(1)
      this.imgs = res.data.banners
  },
}
</script>

<style lang="less">
.swiperCom{
  width: 7.5rem;
  .swiper-container{
      width: 7.1rem;
      height: 2.9rem;
      border-radius: 0.1rem;
  }
  .swiper-slide img{
    width: 100%;
  }
}
</style>